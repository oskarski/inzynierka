import { useRecipesCategories } from '../RecipesCategories.context';
import { useAdaptedQuery } from '@fe/utils';

const ListAllRecipesCategoriesQueryKey = [
  'recipesCategoriesApi.listAllCategories',
];

export const useListAllRecipesCategories = () => {
  const { recipesCategoriesApi } = useRecipesCategories();

  return useAdaptedQuery(ListAllRecipesCategoriesQueryKey, () =>
    recipesCategoriesApi.listAllCategories()
  );
};
