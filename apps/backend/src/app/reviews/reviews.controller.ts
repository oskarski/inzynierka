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
  constructor(private readonly reviewsService: ReviewsService) {
    console.log(reviewsService); // Sprawdź, czy instancja jest poprawnie wstrzykiwana
  }

  @Get()
  async listReviews(): Promise<Review[]> {
    return this.reviewsService.listReviews();
  }

  @Post()
  async addOrUpdateReview(
    @Body() reviewDto: IAddReviewDto,
    @CurrentUser() currentUser: User,
  ): Promise<number> {
    if (currentUser) {
      const hasReviewed = await this.reviewsService.hasReviewedRecipe(
        currentUser.id,
        reviewDto.recipe_id,
      );

      if (hasReviewed) {
        await this.reviewsService.modifyReview(
          currentUser.id,
          reviewDto.recipe_id,
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

      // Calculate and update the average rating
      await this.reviewsService.updateAverageRating(reviewDto.recipe_id);

      // Calculate and return the updated average rating
      return await this.reviewsService.calculateAverageRating(
        reviewDto.recipe_id,
      );
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
