import { Repository } from 'typeorm';
import { Recipe } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Pagination } from '../../utils';
import { IngredientId, RecipeCategoryId, RecipeId, UserId } from '@lib/shared';

interface FindAllSelect {
  id: RecipeId;
  name: string;
  description: string;
  preparationTime: number;
  portions: number;
  categoryIds: RecipeCategoryId[];
}

interface FindOneSelect {
  id: RecipeId;
  name: string;
  description: string;
  preparationTime: number;
  portions: number;
  categoryIds: RecipeCategoryId[];
  instructions: Array<{ step: string }>;
  ingredients: Array<{
    id: IngredientId;
    name: string;
    quantity: number;
    unit: string;
  }>;
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
      .addSelect('array_agg(category.category_id)', 'categoryIds')
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

  async findRecipeWithDetail(id: RecipeId): Promise<FindOneSelect | null> {
    return this.repository
      .createQueryBuilder('recipe')
      .select([
        'recipe.id id',
        'recipe.name name',
        'recipe.description description',
        'recipe.portions portions',
        'recipe.instructions instructions',
      ])
      .addSelect('recipe.preparation_time', 'preparationTime')
      .addSelect(
        'array_remove(array_agg(DISTINCT category.category_id), NULL)',
        'categoryIds',
      )
      .addSelect(
        "array_agg(json_build_object('id', ingredient.id, 'name', ingredient.name, 'quantity', recipeIngredients.quantity, 'unit', recipeIngredients.unit))",
        'ingredients',
      )
      .leftJoin('recipe.categories', 'category')
      .innerJoin('recipe.ingredients', 'recipeIngredients')
      .innerJoin('recipeIngredients.ingredient', 'ingredient')
      .where('recipe.id = :id', { id })
      .groupBy('recipe.id')
      .getRawOne<FindOneSelect>();
  }

  findAllFavourite(userId: UserId): Promise<FindAllSelect[]> {
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
      .innerJoin('users_favourite_recipes', 'ufr', 'ufr.recipe_id = recipes.id')
      .where('ufr.user_id = :userId', { userId })
      .groupBy('recipes.id')
      .orderBy('recipes.id')
      .getRawMany();
  }
}
