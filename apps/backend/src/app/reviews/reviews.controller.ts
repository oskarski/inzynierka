import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './services';
import { CurrentUser, PrivateApiGuard } from '../auth';
import { User } from '../iam/entities';
import { IReviewListItemDto } from '@lib/shared/dist/types/reviews';
import { Review } from './entities';

@Controller('reviews')
@UseGuards(PrivateApiGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async listReviews(): Promise<Review[]> {
    return this.reviewsService.listReviews();
  }

  @Post(':recipeId')
  async addOrUpdateReview(
    @Param('recipeId') recipeId: string,
    @Body() reviewDto: IReviewListItemDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    if (currentUser) {
      const hasReviewed = await this.reviewsService.hasReviewedRecipe(
        currentUser.id,
        recipeId,
      );

      if (hasReviewed) {
        await this.reviewsService.modifyReview(
          currentUser.id,
          recipeId,
          reviewDto,
        );
      } else {
        // Add a new review
        await this.reviewsService.addReview(
          currentUser.id,
          recipeId,
          reviewDto,
        );
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }
}
