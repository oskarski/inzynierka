import { DataSource, EntityManager, Repository } from 'typeorm';
import { Review } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review) private repository: Repository<Review>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.repository.find();
  }

  async findByUserAndRecipe(
    userId: string,
    recipeId: string,
  ): Promise<Review | undefined> {
    const review = await this.repository
      .createQueryBuilder('review')
      .where('review.reviewer_id = :userId', { userId })
      .andWhere('review.recipe_id = :recipeId', { recipeId })
      .getOne();

    return review;
  }

  async findByRecipeId(recipeId: string): Promise<Review[]> {
    const options: FindManyOptions<Review> = {
      where: {
        recipe_id: recipeId as any,
      },
    };

    return this.repository.find(options);
  }

  create(review: {
    recipe_id: string;
    reviewerId: string;
    created_at: any;
    value: number;
  }): Review {
    return this.repository.create(review);
  }

  save(review: Review): Promise<Review> {
    return this.repository.save(review);
  }
}
