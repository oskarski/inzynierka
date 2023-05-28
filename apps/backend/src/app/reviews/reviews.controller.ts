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
import {
  IAddReviewDto,
  IUserRecipeReviewDto,
  RecipeId,
  UserId,
} from '@lib/shared';
import { Review } from './entities';

@Controller('reviews')
@UseGuards(PrivateApiGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async listReviews(): Promise<Review[]> {
    return this.reviewsService.listReviews();
  }

  @Post()
  async addOrUpdateReview(
    @Body() reviewDto: IAddReviewDto,
    @CurrentUser() currentUser: User,
  ): Promise<void> {
    if (currentUser) {
      const hasReviewed = await this.reviewsService.hasReviewedRecipe(
        currentUser.id,
        reviewDto.recipe_id,
      );

      if (hasReviewed) {
        await this.reviewsService.modifyReview(
          reviewDto.recipe_id, // Pass the recipe ID instead of the user ID
          reviewDto,
        );
      } else {
        // Add a new review
        await this.reviewsService.addReview(
          currentUser.id,
          reviewDto.recipe_id,
          reviewDto,
        );
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }

  @Get('/:recipeId')
  async getUserReviewForRecipe(
    @Param('recipeId') recipeId: RecipeId,
    @CurrentUser() currentUser: User,
  ): Promise<IUserRecipeReviewDto> {
    if (currentUser) {
      const userId: UserId = currentUser.id;

      const existingReview = await this.reviewsService.findByUserAndRecipe(
        userId,
        recipeId,
      );

      if (existingReview) {
        return { value: existingReview.value };
      } else {
        return { value: undefined };
      }
    } else {
      throw new BadRequestException('User not found');
    }
  }
}
