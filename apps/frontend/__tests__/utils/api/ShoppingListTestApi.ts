import { apiMethodMock } from './apiMethodMock';
import { IShoppingListApi } from '@fe/shopping-list';

export class ShoppingListTestApi implements IShoppingListApi {
  listShoppingListItems = apiMethodMock<
    IShoppingListApi['listShoppingListItems']
  >('IShoppingListApi.listShoppingListItems');

  bulkAddToShoppingList = apiMethodMock<
    IShoppingListApi['bulkAddToShoppingList']
  >('IShoppingListApi.bulkAddToShoppingList');

  updateShoppingListItem = apiMethodMock<
    IShoppingListApi['updateShoppingListItem']
  >('IShoppingListApi.updateShoppingListItem');

  bulkDeleteShoppingListItems = apiMethodMock<
    IShoppingListApi['bulkDeleteShoppingListItems']
  >('IShoppingListApi.bulkDeleteShoppingListItems');
}
