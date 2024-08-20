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

export interface Release {
  id: number;
  version: string;
  description: string;
  released: boolean;
  owner: string;
}

// https://directfn-jira.atlassian.net/projects/PRO11/versions/45331
export class Jira {}
