import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  IsInt,
  Min,
  Max,
  IsString,
  MinLength,
  MaxLength
} from 'class-validator';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Column()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  matchId!: number;

  @Column()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  jobId!: number;

  @Column()
  @IsInt()
  @Min(1)
  @Max(2147483647)
  userId!: number;

  @Column({ default: 'ACTIVE' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  status!: string;
}