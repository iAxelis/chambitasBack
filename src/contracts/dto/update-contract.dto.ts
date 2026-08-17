import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateContractDto {
  @IsOptional()
  @IsString()
  @IsIn([
    'ACTIVE',
    'COMPLETED',
    'CANCELLED',
  ])
  status?: string;
}