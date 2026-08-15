import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSkillsController } from './user-skills.controller';
import { UserSkillsService } from './user-skills.service';
import { UserSkill } from './entities/user-skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSkill]),
  ],
  controllers: [UserSkillsController],
  providers: [UserSkillsService],
})
export class UserSkillsModule {}