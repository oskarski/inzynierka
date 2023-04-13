import { useRecipesApi } from './RecipesApi.context';
import { useAdaptedQuery, PaginationSelector } from '@fe/utils';
import { IRecipeListItemDto, IPaginated } from '@lib/shared';
import { RecipeListItemSelector } from './selectors';
import { IRecipeListItem } from '@fe/recipes';

export const useListPaginatedRecipes = (page: number) => {
  const { recipesApi } = useRecipesApi();

  return useAdaptedQuery<
    IPaginated<IRecipeListItemDto>,
    IPaginated<IRecipeListItem>
  >(
    ['recipesApi', 'listPaginatedRecipes', page],
    () => recipesApi.listPaginatedRecipes({ page, perPage: 20 }),
    {
      select: PaginationSelector(RecipeListItemSelector),
    }
  );
};
