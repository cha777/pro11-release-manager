export interface Release {
  id: string;
  name: string;
  released: boolean;

  description: string;
  startDate: string;
  releaseDate: string;

  dfnRmID?: number;
  dfnRmReleaseDate?: string;
  component?: string;
  workflow?: string;
  workflowId?: number;
  uploadedBy?: string;
  lastUpdated?: string;
  updatedBy?: string;

  releaseLocation?: string;
  releaseNoteLocation?: string;

  [key: string]: unknown;
}
