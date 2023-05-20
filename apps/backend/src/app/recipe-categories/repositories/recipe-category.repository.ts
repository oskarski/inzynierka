import { DataSource, EntityManager, Repository } from 'typeorm';
import { Category } from '../entities';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeCategoryRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
    @InjectEntityManager() private postManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findPopularCategories(): Promise<Category[]> {
    const query = `
      SELECT *
      FROM categories
      INNER JOIN (
        SELECT category_id, COUNT(recipe_id) AS count
        FROM recipe_categories
        GROUP BY category_id
        ORDER BY COUNT(recipe_id) DESC
        LIMIT 5
      ) AS popular_categories ON category_id = categories.id
      ORDER BY count DESC
    `;

    return this.repository.query(query);
  }
}
