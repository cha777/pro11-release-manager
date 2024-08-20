import { Expose, Transform } from 'class-transformer';

export class JiraAuthDto {
  @Expose()
  @Transform(({ obj }) => obj.accountId)
  id: string;

  @Expose()
  @Transform(({ obj }) => obj.emailAddress)
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.displayName)
  name: string;

  @Expose()
  @Transform(({ obj }) => obj.avatarUrls['48x48'])
  avatarUrl: string;
}
