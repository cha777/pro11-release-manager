import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { plainToInstance } from 'class-transformer';
import { JiraAuthDto } from './dto/jira-auth.dto';

@Injectable()
export class AuthService {
  private readonly jiraBaseUrl = 'https://directfn-jira.atlassian.net';

  async validateUser(email: string, apiToken: string): Promise<any> {
    try {
      const { data } = await axios.get(
        `${this.jiraBaseUrl}/rest/api/latest/myself`,
        {
          auth: {
            username: email,
            password: apiToken,
          },
        },
      );

      const authData = plainToInstance(JiraAuthDto, data, {
        excludeExtraneousValues: true,
      });

      return authData;
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Invalid Jira credentials');
    }
  }
}
