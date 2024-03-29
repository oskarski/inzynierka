import {
  IBulkAddToShoppingListDto,
  IBulkDeleteShoppingListItemsDto,
  IShoppingListItemDto,
  IUpdateShoppingListItemDto,
  ShoppingListItemId,
} from '@lib/shared';
import { HttpClient } from '@fe/utils';

export interface IShoppingListApi {
  listShoppingListItems(): Promise<IShoppingListItemDto[]>;

  bulkAddToShoppingList(
    dto: IBulkAddToShoppingListDto
  ): Promise<IShoppingListItemDto[]>;

  updateShoppingListItem(
    shoppingListItem: ShoppingListItemId,
    dto: IUpdateShoppingListItemDto
  ): Promise<IShoppingListItemDto[]>;

  bulkDeleteShoppingListItems(
    dto: IBulkDeleteShoppingListItemsDto
  ): Promise<IShoppingListItemDto[]>;
}

export class ShoppingListApi implements IShoppingListApi {
  private readonly baseUrl = '/shopping-list';

  constructor(private readonly httpClient: HttpClient) {}

  listShoppingListItems(): Promise<IShoppingListItemDto[]> {
    return this.httpClient.get<IShoppingListItemDto[]>(this.baseUrl);
  }

  bulkAddToShoppingList(
    dto: IBulkAddToShoppingListDto
  ): Promise<IShoppingListItemDto[]> {
    return this.httpClient.post<
      IBulkAddToShoppingListDto,
      IShoppingListItemDto[]
    >(`${this.baseUrl}/bulk`, dto);
  }

  updateShoppingListItem(
    shoppingListItem: ShoppingListItemId,
    dto: IUpdateShoppingListItemDto
  ): Promise<IShoppingListItemDto[]> {
    return this.httpClient.put<
      IUpdateShoppingListItemDto,
      IShoppingListItemDto[]
    >(`${this.baseUrl}/${shoppingListItem}`, dto);
  }

  bulkDeleteShoppingListItems(
    dto: IBulkDeleteShoppingListItemsDto
  ): Promise<IShoppingListItemDto[]> {
    return this.httpClient.delete<
      IBulkDeleteShoppingListItemsDto,
      IShoppingListItemDto[]
    >(`${this.baseUrl}/bulk`, dto);
  }
}
