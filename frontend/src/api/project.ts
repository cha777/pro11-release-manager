import axios from 'axios';
import type { Project } from '@/types/project';

type ChangeWorkflowRequestType = {
  id: number;
  workflow: number;
  comment: string;
};

const getProjectDetails = async (): Promise<Project> => {
  const result = await axios.get('/api/jira/project');
  return result.data;
};

const changeWorkflow = async (data: ChangeWorkflowRequestType): Promise<void> => {
  const result = await axios.post('/api/jira/edit-workflow', data);
  return result.data;
};

export default {
  getProjectDetails,
  changeWorkflow,
};
