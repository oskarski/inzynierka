export type ShoppingListItemId = string & { readonly __type: unique symbol };

export interface IShoppingListItemDto {
  readonly id: ShoppingListItemId;
  readonly name: string;
  readonly quantity: number;
  readonly unit: string;
  readonly completed: boolean;
}
