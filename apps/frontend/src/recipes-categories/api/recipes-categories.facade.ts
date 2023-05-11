import { useRecipesCategoriesApi } from './RecipesCategoriesApi.context';
import { useAdaptedQuery } from '@fe/utils';
import { IListCategoriesQueryDto } from '@lib/shared';

export const ListAllRecipesCategoriesQueryKey = [
  'recipesCategoriesApi.listCategories',
];

export const useListCategories = (queryDto: IListCategoriesQueryDto = {}) => {
  const { recipesCategoriesApi } = useRecipesCategoriesApi();

  return useAdaptedQuery(ListAllRecipesCategoriesQueryKey, () =>
    recipesCategoriesApi.listCategories(queryDto)
  );
};
