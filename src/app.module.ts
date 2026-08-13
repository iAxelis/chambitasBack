import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { MatchesModule } from './matches/matches.module';
import { ContractsModule } from './contracts/contracts.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [UsersModule, JobsModule, ApplicationsModule, MatchesModule, ContractsModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
