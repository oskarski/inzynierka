import { useRecipesApi } from './RecipesApi.context';
import { useAdaptedQuery, PaginationSelector } from '@fe/utils';
import { IRecipeListItemDto, IPaginated } from '@lib/shared';
import { RecipeListItemSelector } from './selectors';
import { IRecipeListItem } from '@fe/recipes';

export const useFindRecipesPaginated = (page: number) => {
  const { recipesApi } = useRecipesApi();

  return useAdaptedQuery<
    IPaginated<IRecipeListItemDto>,
    IPaginated<IRecipeListItem>
  >(
    ['recipesApi', 'findRecipesPaginated', page],
    () => recipesApi.findRecipesPaginated({ page, perPage: 20 }),
    {
      select: PaginationSelector(RecipeListItemSelector),
    }
  );
};
