import { IRecipeDto, IRecipeListItemDto, UserId } from '@lib/shared';

export interface IRecipeListItem extends IRecipeListItemDto {
  readonly formattedPreparationTime: string;
  readonly isPublished: boolean;
  readonly ingredientsPercentageCoverage: number | undefined;
}

export interface IRecipe extends IRecipeDto {
  readonly formattedPreparationTime: string;
  readonly isPublished: boolean;

  isAuthoredBy(userId: UserId | undefined): boolean;
}
