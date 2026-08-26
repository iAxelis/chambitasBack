import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateApplicationDto {
  @IsInt()
  @IsNotEmpty()
  jobId!: number;

  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @IsOptional()
  @IsString()
  message?: string;
}