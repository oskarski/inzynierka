import { IRecipeListItemDto } from '@lib/shared';

export interface IRecipeListItem extends IRecipeListItemDto {
  readonly formattedPreparationTime: string;
}
