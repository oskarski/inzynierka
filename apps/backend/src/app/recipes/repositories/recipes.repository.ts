import { Repository } from 'typeorm';
import { Recipe } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';
import { RecipeCategoryId, RecipeId } from '@lib/shared';

interface FindAllSelect {
  id: RecipeId;
  name: string;
  description: string;
  preparationTime: number;
  portions: number;
  categoryIds: RecipeCategoryId[];
}

@Injectable()
export class RecipesRepository {
  constructor(
    @InjectRepository(Recipe)
    private repository: Repository<Recipe>,
  ) {}

  findAll(pagination: Pagination): Promise<[FindAllSelect[], number]> {
    return this.repository
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.name',
        'recipe.description',
        'recipe.preparationTime',
        'recipe.portions',
      ])
      .addSelect('array_agg(category.id)', 'categoryIds')
      .leftJoin('recipe.categories', 'category')
      .groupBy('recipe.id')
      .orderBy('recipe.id')
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();
  }

  find(id: RecipeId): Promise<Recipe | null> {
    return this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }
}
