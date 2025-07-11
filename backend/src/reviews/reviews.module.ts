import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { DatabaseModule } from 'src/database/database.module';
import { reviewsProviders } from './reviews.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ...reviewsProviders],
  exports: [ReviewsService, ...reviewsProviders],
})
export class ReviewsModule {}
