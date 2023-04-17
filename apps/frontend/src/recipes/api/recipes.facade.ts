import { useRecipesApi } from './RecipesApi.context';
import { PaginationSelector, usePaginatedQuery } from '@fe/utils';
import { IRecipeListItemDto } from '@lib/shared';
import { RecipeListItemSelector } from './selectors';
import { IRecipeListItem } from './types';

export const useListPaginatedRecipes = () => {
  const { recipesApi } = useRecipesApi();

  return usePaginatedQuery<IRecipeListItemDto, IRecipeListItem>(
    ['recipesApi', 'listPaginatedRecipes'],
    ({ pageParam = 0 }) =>
      recipesApi.listPaginatedRecipes({ page: pageParam, perPage: 20 }),
    20,
    {
      select: PaginationSelector(RecipeListItemSelector),
    }
  );
};
