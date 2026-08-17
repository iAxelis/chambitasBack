import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { UserSkillsModule } from './user-skills/user-skills.module';
import { JobsModule } from './jobs/jobs.module';
import { JobSkillsModule } from './job-skills/job-skills.module';
import { ApplicationsModule } from './applications/applications.module';
import { MatchesModule } from './matches/matches.module';
import { ContractsModule } from './contracts/contracts.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'chambitas',  
      autoLoadEntities: true,
      synchronize: true,
    }),

    UsersModule,
    AuthModule,
    SkillsModule,
    UserSkillsModule,
    JobsModule,
    JobSkillsModule,
    ApplicationsModule,
    MatchesModule,
    ContractsModule,
    ReviewsModule
    
    

  ],
})
export class AppModule {}