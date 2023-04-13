import { Duration } from '@fe/utils';
import { IRecipeListItemDto } from '@lib/shared';
import { IRecipeListItem } from './types';

export const RecipeListItemSelector = (
  dto: IRecipeListItemDto
): IRecipeListItem => {
  const duration = Duration.fromSeconds(dto.preparationTime);

  return {
    ...dto,
    formattedPreparationTime: duration.format('H:MM'),
  };
};
