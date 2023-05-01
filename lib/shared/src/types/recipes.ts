import { RecipeCategoryId } from './recipe-categories';
import { IngredientId } from './ingredients';

export type RecipeId = string & { readonly __type: unique symbol };

export interface ISaveRecipeIngredientDto {
  readonly id: IngredientId;
  readonly quantity: number;
  readonly unit: string;
}

interface ISaveRecipeDto {
  readonly name: string;
  readonly description: string;
  readonly preparationTime: number;
  readonly portions: number;
  readonly categoryIds: RecipeCategoryId[];
  readonly instructions: IRecipeInstructionDto[];
  readonly ingredients: ISaveRecipeIngredientDto[];
}

export type ICreateRecipeDto = ISaveRecipeDto;

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

export interface IRecipeIngredientDto {
  readonly id: IngredientId;
  readonly name: string;
  readonly quantity: number;
  readonly unit: string;
}

export interface IRecipeDto {
  readonly id: RecipeId;
  readonly name: string;
  readonly description: string;
  readonly preparationTime: number;
  readonly portions: number;
  readonly categoryIds: RecipeCategoryId[];
  readonly instructions: IRecipeInstructionDto[];
  readonly ingredients: IRecipeIngredientDto[];
}
