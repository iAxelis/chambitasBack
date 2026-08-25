import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  contractId!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  reviewerId!: number;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(2147483647)
  reviewedUserId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating!: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  comment?: string;
}
