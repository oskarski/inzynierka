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

  findPopularCategories(): Promise<Category[]> {
    return this.repository
      .createQueryBuilder('category')
      .select('category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('category.id')
      .orderBy('count', 'DESC')
      .getRawMany()
      .then((results) => results.map((result) => result.category));
  }
}
