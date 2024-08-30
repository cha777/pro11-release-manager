export interface JiraRelease {
  id: unknown;
  name: string;
  released: boolean;
  [key: string]: unknown;
}

export interface DfnRmRelease {
  id: number;
  version: string;
  owner: string;
  description: string;
  storageUrl: string;
  releaseNoteUrl: string;
  workflow: string;
  release_date: string;
}

// https://directfn-jira.atlassian.net/projects/PRO11/versions/45331
export class Jira {}
