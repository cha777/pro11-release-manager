import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class ChangeWorkflowDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsIn([1, 2, 3, 4])
  workflow: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
