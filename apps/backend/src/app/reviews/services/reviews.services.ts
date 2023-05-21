import { Injectable, NotFoundException } from '@nestjs/common';

import { ReviewRepository } from '../repositories';
import { Review } from '../entities';
import { IReviewListItemDto } from '@lib/shared/dist/types/reviews';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async listReviews(): Promise<Review[]> {
    return this.reviewRepository.findAll();
  }

  async hasReviewedRecipe(userId: string, recipeId: string): Promise<boolean> {
    const existingReview = await this.reviewRepository.findByUserAndRecipe(
      userId,
      recipeId,
    );
    return !!existingReview;
  }

  async modifyReview(
    userId: string,
    recipeId: string,
    reviewDto: IReviewListItemDto,
  ): Promise<void> {
    const existingReview = await this.reviewRepository.findByUserAndRecipe(
      userId,
      recipeId,
    );

    if (!existingReview) {
      throw new NotFoundException('Review not found');
    }

    existingReview.value = reviewDto.review_value;

    await this.reviewRepository.save(existingReview); // Save the modified review
  }

  async addReview(
    userId: string,
    recipeId: string,
    reviewDto: IReviewListItemDto,
  ): Promise<void> {
    const newReview = this.reviewRepository.create({
      recipe_id: recipeId,
      reviewerId: userId,
      value: reviewDto.review_value,
      created_at: reviewDto.created_at,
    });

    await this.reviewRepository.save(newReview);
  }
}