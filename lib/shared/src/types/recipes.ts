export type RecipeId = string & { readonly __type: unique symbol };

export interface IRecipeListItemDto {
  readonly id: RecipeId;
  readonly name: string;
  readonly description: string;
  readonly preparationTime: number;
  readonly portions: number;
}
