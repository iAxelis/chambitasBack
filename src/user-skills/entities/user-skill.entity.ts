import {Column,Entity,PrimaryGeneratedColumn,} from 'typeorm';

@Entity('user_skills')
export class UserSkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  skillId!: number;
}