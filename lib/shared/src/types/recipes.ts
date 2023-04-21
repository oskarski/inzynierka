import { RecipeCategoryId } from './recipe-categories';

export type RecipeId = string & { readonly __type: unique symbol };

export interface IListRecipesQueryDto {
  readonly page: number;
  readonly perPage: number;
}

export interface IRecipeListItemDto {
  readonly id: RecipeId;
  readonly name: string;
  readonly description: string;
  readonly preparationTime: number;
  readonly portions: number;
  readonly categoryIds: RecipeCategoryId[];
}

export interface IRecipeInstructionDto {
  readonly step: string;
}

export interface IRecipeDto {
  readonly id: RecipeId;
  readonly name: string;
  readonly description: string;
  readonly preparationTime: number;
  readonly portions: number;
  readonly categoryIds: RecipeCategoryId[];
  readonly instructions: IRecipeInstructionDto[];
}
