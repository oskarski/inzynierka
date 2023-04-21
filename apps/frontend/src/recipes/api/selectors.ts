import { Duration } from '@fe/utils';
import { IRecipeDto, IRecipeListItemDto } from '@lib/shared';
import { IRecipe, IRecipeListItem } from './types';

export const RecipeListItemSelector = (
  dto: IRecipeListItemDto
): IRecipeListItem => {
  const duration = Duration.fromSeconds(dto.preparationTime);

  return {
    ...dto,
    formattedPreparationTime: duration.format('H:MM'),
  };
};

export const RecipeDetailsSelector = (dto: IRecipeDto): IRecipe => {
  const duration = Duration.fromSeconds(dto.preparationTime);

  return {
    ...dto,
    formattedPreparationTime: duration.format('H:MM'),
  };
};
