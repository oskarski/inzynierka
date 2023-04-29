import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { IRecipeInstructionDto, RecipeCategoryId, RecipeId } from '@lib/shared';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { RecipeCategory } from './recipe-category.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: RecipeId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'int', name: 'preparation_time' })
  preparationTime: number;

  @Column({ type: 'int' })
  portions: number;

  @Column({ type: 'jsonb', default: '[]' })
  instructions: IRecipeInstructionDto[];

  @OneToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.recipe)
  categories: RecipeCategory[];

  @RelationId((recipe: Recipe) => recipe.categories)
  categoryIds: RecipeCategoryId[];

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
  )
  ingredients: RecipeIngredient[];
}
