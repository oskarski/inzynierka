import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RecipeCategoryId, RecipeId } from '@lib/shared';
import { Recipe } from './recipe.entity';
import { Category } from '../../recipe-categories/entities';

@Entity('recipe_categories')
export class RecipeCategory {
  @PrimaryColumn({ name: 'recipe_id' })
  recipeId: RecipeId;

  @PrimaryColumn({ name: 'category_id' })
  categoryId: RecipeCategoryId;

  @ManyToOne(() => Recipe, (recipe) => recipe.categories)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
