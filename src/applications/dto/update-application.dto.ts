import {
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  @IsIn([
    'PENDING',
    'ACCEPTED',
    'REJECTED',
  ])
  status?: string;
}