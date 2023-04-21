import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { IRecipeInstructionDto, RecipeCategoryId, RecipeId } from '@lib/shared';
import { RecipeCategory } from '../../recipe-categories/entities';

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

  @ManyToMany(() => RecipeCategory)
  @JoinTable({ name: 'recipes_recipes_categories' })
  categories: RecipeCategory[];

  @RelationId((recipe: Recipe) => recipe.categories)
  categoryIds: RecipeCategoryId[];
}
