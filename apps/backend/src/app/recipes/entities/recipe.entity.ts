import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import {
  IRecipeInstructionDto,
  RecipeCategoryId,
  RecipeDifficulty,
  RecipeId,
  RecipeState,
  UserId,
} from '@lib/shared';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { RecipeCategory } from './recipe-category.entity';
import { User } from '../../iam/entities';

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

  @OneToMany(() => RecipeCategory, (recipeCategory) => recipeCategory.recipe, {
    cascade: true,
  })
  categories: RecipeCategory[];

  @RelationId((recipe: Recipe) => recipe.categories)
  categoryIds: RecipeCategoryId[];

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
    {
      cascade: true,
    },
  )
  ingredients: RecipeIngredient[];

  @Column({ nullable: true, name: 'author_id' })
  @RelationId((recipe: Recipe) => recipe.author)
  authorId: UserId | null;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  author: User | null;

  @Column({ default: RecipeState.draft, enum: RecipeState })
  state: RecipeState;

  @Column({
    type: 'enum',
    default: RecipeDifficulty.medium,
    enum: RecipeDifficulty,
  })
  difficulty: RecipeDifficulty;

  isCreatedBy(authorId: UserId): boolean {
    return this.authorId === authorId;
  }
}
