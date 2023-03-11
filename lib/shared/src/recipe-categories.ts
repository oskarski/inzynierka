export type RecipeCategoryId = string & { readonly __type: unique symbol }

export interface IRecipeCategoryListItemDto {
  readonly id: RecipeCategoryId;
  readonly name: string;
}