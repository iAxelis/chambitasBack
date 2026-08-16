import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  contractId!: number;

  @Column()
  reviewerId!: number;

  @Column()
  reviewedUserId!: number;

  @Column()
  rating!: number;

  @Column({ nullable: true })
  comment!: string | null;
}