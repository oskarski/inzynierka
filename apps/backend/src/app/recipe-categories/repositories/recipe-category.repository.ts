import { DataSource, EntityManager, Repository } from 'typeorm';
import { RecipeCategory } from '../entities';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeCategoryRepository {
  constructor(
    @InjectRepository(RecipeCategory) private repository: Repository<RecipeCategory>,
    @InjectEntityManager() private postManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource) {
  }

  listAll(): Promise<RecipeCategory[]> {
    return this.repository.find();
  }
}
