import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities';
import { ReviewRepository } from './repositories';
import { Recipe } from '../recipes/entities';
import { RecipesRepository } from '../recipes/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Recipe])],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReviewRepository],
})
export class ReviewsModules {}
