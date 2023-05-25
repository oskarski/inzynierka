import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import {
  IngredientId,
  RecipeCategoryId,
  RecipeDifficulty,
  RecipeId,
  RecipeState,
  UserId,
} from '@lib/shared';
import { Recipe } from './recipe.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { Ingredient } from '../../ingredients/entities';
import { RecipeCategory } from './recipe-category.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .from(Recipe, 'recipe')
      .leftJoin(
        RecipeIngredient,
        'recipeIngredients',
        'recipe.id = recipeIngredients.recipe_id',
      )
      .leftJoin(
        Ingredient,
        'ingredient',
        'recipeIngredients.ingredient_id = ingredient.id',
      )
      .leftJoin(
        RecipeCategory,
        'recipeCategories',
        'recipeCategories.recipe_id = recipe.id',
      )
      .select([
        'recipe.id AS id',
        'recipe.name AS name',
        'recipe.description AS description',
        'recipe.portions AS portions',
        'recipe.instructions AS instructions',
        'recipe.state AS state',
        'recipe.difficulty AS difficulty',
        'recipe.review AS review',
      ])
      .addSelect('recipe.preparation_time', 'preparationTime')
      .addSelect('recipe.author_id', 'authorId')
      .addSelect('recipe.cover_image', 'coverImage')
      .addSelect(
        'array_remove(array_agg(DISTINCT recipeCategories.category_id), NULL)',
        'categoryIds',
      )
      .addSelect(
        `array_remove(
                  array_agg(
                    DISTINCT
                    CASE
                    WHEN 
                      ingredient.id IS NOT NULL AND
                      ingredient.name IS NOT NULL AND 
                      "recipeIngredients".quantity IS NOT NULL AND
                      "recipeIngredients".unit IS NOT NULL
                    THEN jsonb_build_object(
                      'id', ingredient.id,
                      'name', ingredient.name,
                      'quantity',
                      "recipeIngredients".quantity,
                      'unit', "recipeIngredients".unit
                    )
                    END
                  ), NULL
                 )`,
        'ingredients',
      )
      .groupBy('recipe.id'),
})
export class RecipeDetailsViewEntity {
  @ViewColumn()
  id: RecipeId;

  @ViewColumn()
  name: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  preparationTime: number;

  @ViewColumn()
  portions: number;

  @ViewColumn()
  categoryIds: RecipeCategoryId[];

  @ViewColumn()
  instructions: Array<{ step: string }>;

  @ViewColumn()
  state: RecipeState;

  @ViewColumn()
  difficulty: RecipeDifficulty;

  @ViewColumn()
  authorId: UserId | null;

  @ViewColumn()
  review: number | null;

  @ViewColumn()
  coverImage: string | null;

  @ViewColumn()
  ingredients: Array<{
    id: IngredientId;
    name: string;
    quantity: number;
    unit: string;
  }>;

  isPublished(): boolean {
    return this.state === RecipeState.published;
  }

  isAuthoredBy(userId: UserId): boolean {
    return this.authorId === userId;
  }
}
