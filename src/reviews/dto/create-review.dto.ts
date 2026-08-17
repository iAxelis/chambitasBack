import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  contractId!: number;

  @IsInt()
  @IsNotEmpty()
  reviewerId!: number;

  @IsInt()
  @IsNotEmpty()
  reviewedUserId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating!: number;

  @IsOptional()
  @IsString()
  comment?: string;
}