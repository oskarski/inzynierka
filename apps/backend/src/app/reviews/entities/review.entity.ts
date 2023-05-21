import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { RecipeId, UserId } from '@lib/shared';
import { Recipe } from '../../recipes/entities';
import { User } from '../../iam/entities';

@Entity({ name: 'reviews' })
export class Review {
  @PrimaryGeneratedColumn('uuid')
  @RelationId((review: Review) => review.recipe)
  recipe_id: RecipeId;

  @ManyToOne(() => Recipe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @PrimaryColumn({ name: 'reviewer_id' })
  @RelationId((review: Review) => review.reviewer)
  reviewerId: UserId;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @Column()
  value: number;

  @Column({ nullable: true })
  created_at: Date;
}