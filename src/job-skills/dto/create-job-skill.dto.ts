import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateJobSkillDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  jobId!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  skillId!: number;
}
