export type IngredientId = string & { readonly __type: unique symbol };

export interface IListIngredientsDto {
  readonly name: string;
}

export interface IIngredientListItemDto {
  readonly id: IngredientId;
  readonly name: string;
}
