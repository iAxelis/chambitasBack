import {IsInt,IsNotEmpty,
} from 'class-validator';

export class CreateUserSkillDto {
  @IsInt()
  @IsNotEmpty()
  userId!: number;

  @IsInt()
  @IsNotEmpty()
  skillId!: number;
}