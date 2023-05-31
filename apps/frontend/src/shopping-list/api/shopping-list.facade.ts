import { useShoppingListApi } from './ShoppingListApi.context';
import { useAdaptedMutation, useAdaptedQuery } from '@fe/utils';
import {
  IBulkAddToShoppingListDto,
  IBulkDeleteShoppingListItemsDto,
  IShoppingListItemDto,
  IUpdateShoppingListItemDto,
  ShoppingListItemId,
} from '@lib/shared';
import { useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();

  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedMutation<IShoppingListItemDto[], IBulkAddToShoppingListDto>(
    (dto) => shoppingListApi.bulkAddToShoppingList(dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GetShoppingListQueryKey);

        if (onSuccess) onSuccess();
      },
    }
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
  const queryClient = useQueryClient();

  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedMutation<IShoppingListItemDto[], IUpdateShoppingListItemDto>(
    (dto) => shoppingListApi.updateShoppingListItem(id, dto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(GetShoppingListQueryKey);

        if (onSuccess) onSuccess();
      },
    }
  );
};

export const useBulkDeleteShoppingListItems = ({
  onSuccess,
}: {
  onSuccess?: () => void;
} = {}) => {
  const queryClient = useQueryClient();

  const { shoppingListApi } = useShoppingListApi();

  return useAdaptedMutation<
    IShoppingListItemDto[],
    IBulkDeleteShoppingListItemsDto
  >((dto) => shoppingListApi.bulkDeleteShoppingListItems(dto), {
    onSuccess: () => {
      queryClient.invalidateQueries(GetShoppingListQueryKey);

      if (onSuccess) onSuccess();
    },
  });
};
