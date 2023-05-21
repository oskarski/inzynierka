import { useShoppingListApi } from './ShoppingListApi.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import { IBulkAddToShoppingListDto, IShoppingListItemDto } from '@lib/shared';

export const GetShoppingListQueryKey = [
  'shoppingListApi.listShoppingListItems',
];

export const useGetShoppingList = () => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedQuery(GetShoppingListQueryKey, () =>
    shoppingListApi.listShoppingListItems()
  );
};

export const useBulkAddToShoppingList = () => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedMutation<IShoppingListItemDto[], IBulkAddToShoppingListDto>(
    (dto) => shoppingListApi.bulkAddToShoppingList(dto)
  );
};
