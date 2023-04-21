import { IRecipeDto, IRecipeListItemDto } from '@lib/shared';

export interface IRecipeListItem extends IRecipeListItemDto {
  readonly formattedPreparationTime: string;
}

export interface IRecipe extends IRecipeDto {
  readonly formattedPreparationTime: string;
}
