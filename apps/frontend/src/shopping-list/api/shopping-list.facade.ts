import { useShoppingListApi } from './ShoppingListApi.context';
import { useAdaptedQuery } from '@fe/utils';

export const GetShoppingListQueryKey = [
  'shoppingListApi.listShoppingListItems',
];

export const useGetShoppingList = () => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedQuery(GetShoppingListQueryKey, () =>
    shoppingListApi.listShoppingListItems()
  );
};
