import { DataSource, EntityManager, Repository } from 'typeorm';
import { Review } from '../entities';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review) private repository: Repository<Review>,
    @InjectEntityManager() private entityManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
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
      .where('review.userId = :userId', { userId })
      .andWhere('review.recipeId = :recipeId', { recipeId })
      .getOne();

    return review;
  }

  create(review: {
    recipe_id: string;
    reviewerId: string;
    created_at: any;
    value: any;
  }): Review {
    return this.repository.create(review);
  }

  save(review: Review): Promise<Review> {
    return this.repository.save(review);
  }
}