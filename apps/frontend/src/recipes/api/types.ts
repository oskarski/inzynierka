import { IRecipeDto, IRecipeListItemDto } from '@lib/shared';

export interface IRecipeListItem extends IRecipeListItemDto {
  readonly formattedPreparationTime: string;
  readonly isPublished: boolean;
}

export interface IRecipe extends IRecipeDto {
  readonly formattedPreparationTime: string;
}
