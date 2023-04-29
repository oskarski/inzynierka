import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { IngredientId, RecipeCategoryId, RecipeId } from '@lib/shared';
import { Recipe } from './recipe.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { Ingredient } from '../../ingredients/entities';
import { RecipeCategory } from './recipe-category.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .from(RecipeIngredient, 'recipeIngredients')
      .innerJoin(Recipe, 'recipe', 'recipeIngredients.recipe_id = recipe.id')
      .innerJoin(
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
        'recipe.id id',
        'recipe.name name',
        'recipe.description description',
        'recipe.portions portions',
        'recipe.instructions instructions',
      ])
      .addSelect('recipe.preparation_time', 'preparationTime')
      .addSelect(
        'array_remove(array_agg(DISTINCT recipeCategories.category_id), NULL)',
        'categoryIds',
      )
      .addSelect(
        "array_agg(json_build_object('id', ingredient.id, 'name', ingredient.name, 'quantity', recipeIngredients.quantity, 'unit', recipeIngredients.unit))",
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
  ingredients: Array<{
    id: IngredientId;
    name: string;
    quantity: number;
    unit: string;
  }>;
}
