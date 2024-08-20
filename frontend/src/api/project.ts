import axios from 'axios';
import type { Project } from '@/types/project';

const getProjectDetails = async (): Promise<Project> => {
  const result = await axios.get('/api/jira/project');
  return result.data;
};

export default {
  getProjectDetails,
};
