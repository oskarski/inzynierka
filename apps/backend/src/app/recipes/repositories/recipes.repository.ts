import { Repository } from 'typeorm';
import { Recipe } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';
import { RecipeCategoryId, RecipeId, UserId } from '@lib/shared';

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

  private listRecipesQuery() {
    return this.repository
      .createQueryBuilder('recipes')
      .select([
        'recipes.id id',
        'recipes.name name',
        'recipes.description description',
        'recipes.portions portions',
      ])
      .addSelect('recipes.preparation_time', 'preparationTime')
      .addSelect('array_agg(category.category_id)', 'categoryIds')
      .leftJoin('recipes.categories', 'category')
      .groupBy('recipes.id')
      .orderBy('recipes.id');
  }

  async findAll(pagination: Pagination): Promise<[FindAllSelect[], number]> {
    const query = this.listRecipesQuery()
      .offset(pagination.skip)
      .limit(pagination.take);

    const recipes = await query.getRawMany();
    const count = await query.getCount();

    return [recipes, count];
  }

  find(id: RecipeId): Promise<Recipe | null> {
    return this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }

  findAllFavourite(userId: UserId): Promise<FindAllSelect[]> {
    return this.listRecipesQuery()
      .innerJoin('users_favourite_recipes', 'ufr', 'ufr.recipe_id = recipes.id')
      .where('ufr.user_id = :userId', { userId })
      .getRawMany();
  }
}
