import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IngredientId, RecipeId } from '@lib/shared';
import { Recipe } from './recipe.entity';
import { Ingredient } from '../../ingredients/entities';

@Entity('recipe_ingredients')
export class RecipeIngredient {
  @PrimaryColumn({ name: 'recipe_id' })
  recipeId: RecipeId;

  @PrimaryColumn({ name: 'ingredient_id' })
  ingredientId: IngredientId;

  @Column({ type: 'decimal' })
  quantity: number;

  @Column()
  unit: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;
}
