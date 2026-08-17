import {
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateJobSkillDto {
  @IsInt()
  @IsNotEmpty()
  jobId!: number;

  @IsInt()
  @IsNotEmpty()
  skillId!: number;
}