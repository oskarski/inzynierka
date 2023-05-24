import { RecipeId } from './recipes';
import { UserId } from './iam';

export type ReviewId = string & { readonly __type: unique symbol };

export interface IReviewDto {
  readonly user_id: UserId;
  readonly recipe_id: RecipeId;
  readonly created_at: Date;
  readonly review_value: number;
}

export interface IAddReviewDto {
  readonly recipe_id: RecipeId;
  readonly review_value: number;
}
