import {
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  @IsNotEmpty()
  jobId!: number;

  @IsInt()
  @IsNotEmpty()
  userId!: number;
}