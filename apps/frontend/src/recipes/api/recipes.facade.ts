import { useRecipesApi } from './Recipes.context';
import { useAdaptedQuery } from '@fe/utils';
import { IRecipeListItemDto, IPaginated } from '@lib/shared';

export const useFindRecipesPaginated = (page: number) => {
  const { recipesApi } = useRecipesApi();

  return useAdaptedQuery<IPaginated<IRecipeListItemDto>>(
    ['recipesApi', 'findRecipesPaginated', page],
    () => recipesApi.findRecipesPaginated({ page, perPage: 20 })
  );
};
