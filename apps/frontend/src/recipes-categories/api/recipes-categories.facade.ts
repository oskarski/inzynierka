import { useRecipesCategoriesApi } from './RecipesCategoriesApi.context';
import { useAdaptedQuery } from '@fe/utils';
import { IListCategoriesQueryDto } from '@lib/shared';
import { FilterCategoriesSelector } from './selectors';

export const ListAllRecipesCategoriesQueryKey = [
  'recipesCategoriesApi.listCategories',
];

export const useListCategories = (queryDto: IListCategoriesQueryDto = {}) => {
  const { recipesCategoriesApi } = useRecipesCategoriesApi();

  return useAdaptedQuery(
    ListAllRecipesCategoriesQueryKey,
    () => recipesCategoriesApi.listCategories(queryDto),
    { select: FilterCategoriesSelector(queryDto) }
  );
};

export const ListPopularCategoriesQueryKey = [
  'recipesCategoriesApi.listPopularCategories',
];

export const useListPopularCategories = (
  queryDto: IListCategoriesQueryDto = {}
) => {
  const { recipesCategoriesApi } = useRecipesCategoriesApi();

  return useAdaptedQuery(
    ListPopularCategoriesQueryKey,
    () => recipesCategoriesApi.listPopularCategories(),
    { select: FilterCategoriesSelector(queryDto) }
  );
};
