import { useShoppingListApi } from './ShoppingListApi.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import {
  IBulkAddToShoppingListDto,
  IBulkDeleteShoppingListItemsDto,
  IShoppingListItemDto,
  IUpdateShoppingListItemDto,
  ShoppingListItemId,
} from '@lib/shared';

export const GetShoppingListQueryKey = [
  'shoppingListApi.listShoppingListItems',
];

export const useGetShoppingList = () => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedQuery(GetShoppingListQueryKey, () =>
    shoppingListApi.listShoppingListItems()
  );
};

export const useBulkAddToShoppingList = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedMutation<IShoppingListItemDto[], IBulkAddToShoppingListDto>(
    (dto) => shoppingListApi.bulkAddToShoppingList(dto),
    { onSuccess }
  );
};

export const useUpdateShoppingListItem = (
  id: ShoppingListItemId,
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  }
) => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedMutation<IShoppingListItemDto[], IUpdateShoppingListItemDto>(
    (dto) => shoppingListApi.updateShoppingListItem(id, dto),
    { onSuccess }
  );
};

export const useBulkDeleteShoppingListItems = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedMutation<
    IShoppingListItemDto[],
    IBulkDeleteShoppingListItemsDto
  >((dto) => shoppingListApi.bulkDeleteShoppingListItems(dto), { onSuccess });
};
