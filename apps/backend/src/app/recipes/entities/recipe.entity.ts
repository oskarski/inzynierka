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
import { Review } from '../../reviews/entities';
import { AfterInsert, AfterUpdate, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  @OneToMany(() => Review, (review) => review.recipe, {
    cascade: true,
  })
  reviews: Review[];

  @Column({ nullable: true })
  review: number | null;

  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  @AfterInsert()
  @AfterUpdate()
  async updateAverageRating(): Promise<void> {
    const reviewQuery = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.recipe = :recipe', { recipe: this });

    const reviews = await reviewQuery.getMany();
    const totalReviews = reviews.length;

    if (totalReviews === 0) {
      this.review = null;
    } else {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.value,
        0,
      );
      const averageRating = totalRating / totalReviews;
      this.review = averageRating;
    }

    await this.recipeRepository.save(this);
  }
}
