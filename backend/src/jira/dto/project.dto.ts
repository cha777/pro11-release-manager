import { Expose } from 'class-transformer';
import { ReleaseDto } from './release.dto';

export class ProjectDto {
  @Expose()
  id: number;

  @Expose()
  key: string;

  @Expose()
  name: string;

  @Expose()
  releases: ReleaseDto[];
}
