import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import {
  RecipeCategoryId,
  RecipeDifficulty,
  RecipeId,
  RecipeState,
  UserId,
} from '@lib/shared';
import { Recipe } from './recipe.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .from(Recipe, 'recipes')
      .leftJoin(
        'recipe_categories',
        'category',
        'category."recipe_id" = recipes."id"',
      )
      .select([
        'recipes.id AS id',
        'recipes.name AS name',
        'recipes.description AS description',
        'recipes.portions AS portions',
        'recipes.state AS state',
        'recipes.difficulty AS difficulty',
        'recipes.review AS review',
      ])
      .addSelect('recipes.preparation_time', 'preparationTime')
      .addSelect('recipes.author_id', 'authorId')
      .addSelect('recipes.cover_image', 'coverImage')
      .addSelect(
        'array_remove(array_agg(category.category_id), NULL)',
        'categoryIds',
      )
      .groupBy('recipes.id')
      .orderBy('recipes.id'),
})
export class RecipeListItemViewEntity {
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
  state: RecipeState;

  @ViewColumn()
  authorId: UserId;

  @ViewColumn()
  difficulty: RecipeDifficulty;

  @ViewColumn()
  review: number | null;

  @ViewColumn()
  coverImage: string | null;
}
