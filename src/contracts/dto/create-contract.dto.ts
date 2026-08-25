import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateContractDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  matchId!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  jobId!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  userId!: number;
}
