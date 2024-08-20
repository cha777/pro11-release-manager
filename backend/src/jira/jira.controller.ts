import { Controller, Get, Session } from '@nestjs/common';
import { JiraService } from './jira.service';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('project')
  async getProjectDetails(@Session() session: any) {
    return this.jiraService.getProjectDetails(session);
  }
}
