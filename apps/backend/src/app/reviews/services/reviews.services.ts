import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from '../repositories';
import { Review } from '../entities';
import { IAddReviewDto } from '@lib/shared';

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
    recipeId: string,
    reviewDto: IAddReviewDto,
  ): Promise<void> {
    const existingReview = await this.reviewRepository.findByUserAndRecipe(
      null, // Pass null or omit the user ID parameter to retrieve the review by recipe ID only
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
    reviewDto: IAddReviewDto,
  ): Promise<void> {
    const newReview = this.reviewRepository.create({
      recipe_id: recipeId,
      reviewerId: userId,
      value: reviewDto.review_value,
      created_at: new Date(),
    });

    await this.reviewRepository.save(newReview);
  }

  async findByUserAndRecipe(
    userId: string,
    recipeId: string,
  ): Promise<Review | undefined> {
    const review = await this.reviewRepository.findByUserAndRecipe(
      userId,
      recipeId,
    );
    return review;
  }
}
