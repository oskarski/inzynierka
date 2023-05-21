export type ReviewId = string & { readonly __type: unique symbol };
import { RecipeId } from './recipes';
import { UserId } from './iam';

export interface IReviewDto {
  readonly user_id: UserId;
  readonly recipe_id: RecipeId;
  readonly created_at: Date;
  readonly review_value: number;
}

export interface IReviewListItemDto {
  readonly id: ReviewId;
  readonly user_id: UserId;
  readonly recipe_id: RecipeId;
  readonly created_at: Date;
  readonly review_value: number;
}
