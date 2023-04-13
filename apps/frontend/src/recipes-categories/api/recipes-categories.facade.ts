import { useRecipesCategoriesApi } from './RecipesCategoriesApi.context';
import { useAdaptedQuery } from '@fe/utils';

const ListAllRecipesCategoriesQueryKey = [
  'recipesCategoriesApi.listAllCategories',
];

export const useListAllRecipesCategories = () => {
  const { recipesCategoriesApi } = useRecipesCategoriesApi();

  return useAdaptedQuery(ListAllRecipesCategoriesQueryKey, () =>
    recipesCategoriesApi.listAllCategories()
  );
};
