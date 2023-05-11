import { DataSource, EntityManager, Repository } from 'typeorm';
import { Category } from '../entities';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ListCategoriesQueryDto } from '../dtos';

@Injectable()
export class RecipeCategoryRepository {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
    @InjectEntityManager() private postManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  findAll(queryDto: ListCategoriesQueryDto): Promise<Category[]> {
    let where = {};

    if (queryDto.type) where['type'] = queryDto.type;

    return this.repository.find({
      where,
    });
  }
}
