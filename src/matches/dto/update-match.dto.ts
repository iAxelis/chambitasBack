import {IsIn,IsOptional,IsString,} from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsString()
  @IsIn([
    'ACTIVE',
    'COMPLETED',
    'CANCELLED',
  ])
  status?: string;
}