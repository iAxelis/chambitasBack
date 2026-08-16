import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('job_skills')
export class JobSkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  jobId!: number;

  @Column()
  skillId!: number;
}