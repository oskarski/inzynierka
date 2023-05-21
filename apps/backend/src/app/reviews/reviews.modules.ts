import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './services/reviews.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities';
import { ReviewRepository } from './repositories/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewRepository],
})
export class ReviewsModules {}
