import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import type { DfnRmRelease, JiraRelease } from './entities/jira.entity';
import { plainToInstance } from 'class-transformer';
import { ReleaseDto } from './dto/release.dto';

@Injectable()
export class JiraService {
  private readonly jiraBaseUrl = 'https://directfn-jira.atlassian.net';
  private readonly rmBaseUrl = 'https://rmserver.directfn.net';

  async getProjectDetails(session: any) {
    if (!session.user || !session.user.email || !session.user.apiToken) {
      throw new UnauthorizedException(
        'No valid Jira credentials found in session.',
      );
    }

    const { email, apiToken } = session.user;
    const projectKey = process.env.PROJECT_KEY;

    try {
      const { data } = await axios.get(
        `${this.jiraBaseUrl}/rest/api/3/project/${projectKey}`,
        {
          auth: {
            username: email,
            password: apiToken,
          },
        },
      );

      const projectReleasePrefix = process.env.PROJECT_RELEASE_PREFIX;
      let minDate = new Date();

      const jiraReleases = (data.versions as JiraRelease[])
        .filter((version) => version.name.startsWith(projectReleasePrefix))
        .reduce((prev, curr) => {
          if (curr.releaseDate) {
            const [year, month, date] = (curr.releaseDate as string)
              .split('-')
              .map((_) => parseInt(_, 10));

            const releaseDate = new Date();
            releaseDate.setFullYear(year, month - 1, date);

            if (releaseDate.getTime() < minDate.getTime()) {
              minDate = releaseDate;
            }
          }

          prev.push(curr);
          return prev;
        }, [] as JiraRelease[]);

      const dfnRmReleases = await this.getDfnRMReleaseList(data.id, minDate);
      const releases = this.mergeReleaseData(jiraReleases, dfnRmReleases);

      return {
        id: data.id,
        name: data.name,
        key: data.key,
        releases,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(
        'Failed to fetch projects from Jira. Please check your credentials.',
      );
    }
  }

  async editWorkflow(
    data: { id: number; workflow: number; comment: string },
    session: any,
  ) {
    if (!session.user || !session.user.email || !session.user.apiToken) {
      throw new UnauthorizedException(
        'No valid Jira credentials found in session.',
      );
    }

    const result = (
      await axios.post(`${this.rmBaseUrl}/edit-workflow`, {
        release_id: data.id,
        workflow: data.workflow,
        comment: data.comment,
        user: session.user.email.replace('directfn', 'Directfn'),
      })
    ).data;

    return result;
  }

  private async getDfnRMReleaseList(projectId: string, minDate: Date) {
    try {
      const currentDate = new Date();
      const projectReleasePrefix = process.env.PROJECT_RELEASE_PREFIX;

      const releases = (
        (
          await axios.post(`${this.rmBaseUrl}/release`, {
            fromdate: `${minDate.getDate()}/${minDate.getMonth() + 1}/${minDate.getFullYear()}`,
            todate: `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`,
            projectList: Number(projectId),
          })
        ).data as DfnRmRelease[]
      ).filter((release) => release.version.startsWith(projectReleasePrefix));

      return releases;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  private mergeReleaseData(
    jiraReleases: JiraRelease[],
    dfnRmReleases: DfnRmRelease[],
  ) {
    const jiraReleaseMap = jiraReleases.reduce(
      (prev, curr) => {
        prev[curr.name] = curr;

        return prev;
      },
      {} as Record<JiraRelease['name'], JiraRelease>,
    );

    const dfnRmReleaseMap = dfnRmReleases.reduce(
      (prev, curr) => {
        prev[curr.version] = curr;

        return prev;
      },
      {} as Record<DfnRmRelease['version'], DfnRmRelease>,
    );

    const releases: ReleaseDto[] = [];

    for (const [version, release] of Object.entries(jiraReleaseMap)) {
      releases.push(
        plainToInstance(
          ReleaseDto,
          {
            ...dfnRmReleaseMap[version],
            dfnRmID: dfnRmReleaseMap[version]?.id,
            dfnRmDescription: dfnRmReleaseMap[version]?.description,
            dfnRmReleaseDate: dfnRmReleaseMap[version]?.release_date,
            ...release,
          },
          {
            excludeExtraneousValues: true,
          },
        ),
      );
    }

    return releases;
  }
}
