import { useRecipesCategoriesApi } from './RecipesCategoriesApi.context';
import { useAdaptedQuery } from '@fe/utils';
import { IListCategoriesQueryDto } from '@lib/shared';
import { FilterCategoriesSelector } from './selectors';

export const ListAllRecipesCategoriesQueryKey = (
  queryDto: IListCategoriesQueryDto
) => ['recipesCategoriesApi.listCategories', queryDto];

export const useListCategories = (queryDto: IListCategoriesQueryDto = {}) => {
  const { recipesCategoriesApi } = useRecipesCategoriesApi();

  return useAdaptedQuery(
    ListAllRecipesCategoriesQueryKey(queryDto),
    () => recipesCategoriesApi.listCategories(queryDto),
    { select: FilterCategoriesSelector(queryDto) }
  );
};
