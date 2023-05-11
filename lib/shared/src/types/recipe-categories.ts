export type RecipeCategoryId = string & { readonly __type: unique symbol };

export enum CategoryType {
  DishType = 'dish-type',
  CuisineType = 'cuisine-type',
  DietType = 'diet-type',
  Other = 'other',
}

export interface IRecipeCategoryListItemDto {
  readonly id: RecipeCategoryId;
  readonly name: string;
}
