import { useShoppingListApi } from './ShoppingListApi.context';
import { useAdaptedQuery } from '@fe/utils';

export const ListAllRecipesCategoriesQueryKey = [
  'recipesCategoriesApi.listCategories',
];

export const useGetShoppingList = () => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedQuery(ListAllRecipesCategoriesQueryKey, () =>
    shoppingListApi.listShoppingListItems()
  );
};
