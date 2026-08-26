import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  jobId!: number;

  @Column()
  userId!: number;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ default: 'PENDING' })
  status!: string;
}