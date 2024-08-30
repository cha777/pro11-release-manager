import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { JiraService } from './jira.service';
import { ChangeWorkflowDto } from './dto/change-workflow-dto';

@Controller('jira')
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @Get('project')
  async getProjectDetails(@Session() session: any) {
    return this.jiraService.getProjectDetails(session);
  }

  @Post('edit-workflow')
  async editWorkflow(
    @Body() workflowDto: ChangeWorkflowDto,
    @Session() session: any,
  ) {
    return this.jiraService.editWorkflow(workflowDto, session);
  }
}
