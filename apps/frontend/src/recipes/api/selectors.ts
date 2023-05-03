import { Duration } from '@fe/utils';
import { IRecipeDto, IRecipeListItemDto, RecipeState } from '@lib/shared';
import { IRecipe, IRecipeListItem } from './types';

export const RecipeListItemSelector = (
  dto: IRecipeListItemDto
): IRecipeListItem => {
  const duration = Duration.fromSeconds(dto.preparationTime);

  return {
    ...dto,
    formattedPreparationTime: duration.format('H:MM'),
    isPublished: dto.state === RecipeState.published,
    ingredientsPercentageCoverage:
      dto.ingredientsCoverage && Math.round(dto.ingredientsCoverage * 100),
  };
};

export const RecipeDetailsSelector = (dto: IRecipeDto): IRecipe => {
  const duration = Duration.fromSeconds(dto.preparationTime);

  return {
    ...dto,
    formattedPreparationTime: duration.format('H:MM'),
  };
};
