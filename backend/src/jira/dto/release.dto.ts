import { Expose, Transform } from 'class-transformer';

export class ReleaseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  startDate: string;

  @Expose()
  releaseDate: string;

  @Expose()
  dfnRmReleaseDate?: string;

  @Expose()
  dfnRmID: string | undefined;

  @Expose()
  component: string | undefined;

  @Expose()
  @Transform(({ obj }) => !!obj.is_rejected)
  isRejected: boolean;

  @Expose()
  workflow: string;

  @Expose()
  @Transform(({ obj }) => obj.workflow_id)
  workflowId: number;

  @Expose()
  @Transform(({ obj }) => obj.uploaded_by)
  uploadedBy: string | undefined;

  @Expose()
  @Transform(({ obj }) => obj.updated_by)
  updatedBy: string | undefined;

  @Expose()
  @Transform(({ obj }) => obj.last_updated)
  lastUpdated: string | undefined;

  @Expose()
  @Transform(({ obj }) => obj.storage_location)
  releaseLocation: string | undefined;

  @Expose()
  @Transform(({ obj }) => obj.release_note_location)
  releaseNoteLocation: string | undefined;
}
