import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from '../repositories';
import { Review } from '../entities';
import { IAddReviewDto, RecipeId } from '@lib/shared';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../../recipes/entities';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    @InjectRepository(Recipe)
    private readonly recRepository: Repository<Recipe>,
  ) {}

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
    reviewDto: IAddReviewDto,
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

  async updateAverageRating(recipeId: RecipeId): Promise<void> {
    const averageRating = await this.calculateAverageRating(recipeId);
    await this.recRepository
      .createQueryBuilder()
      .update(Recipe)
      .set({ review: averageRating })
      .where('id = :recipeId', { recipeId: recipeId })
      .execute();
  }

  async calculateAverageRating(recipeId: string): Promise<number> {
    const [{ avg: averageRating }] = await this.recRepository
      .createQueryBuilder()
      .select('avg(value)')
      .from('reviews', 'reviews')
      .where('recipe_id = :recipeId', { recipeId: recipeId })
      .execute();
    return parseInt(averageRating);
  }
}
