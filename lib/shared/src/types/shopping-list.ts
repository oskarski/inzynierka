import { IngredientId } from './ingredients';

export type ShoppingListItemId = string & { readonly __type: unique symbol };

export interface IShoppingListItemDto {
  readonly id: ShoppingListItemId;
  readonly name: string;
  readonly quantity: number;
  readonly unit: string;
  readonly completed: boolean;
}

export interface IAddToShoppingListItemDto {
  readonly ingredientId: IngredientId;
  readonly quantity: number;
  readonly unit: string;
}

export interface IBulkAddToShoppingListDto {
  readonly items: IAddToShoppingListItemDto[];
}

export interface IUpdateShoppingListItemDto {
  readonly quantity: number;
  readonly unit: string;
  readonly completed: boolean;
}
