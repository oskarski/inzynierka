import { RecipeCategoryId } from './recipe-categories';
import { IngredientId } from './ingredients';

export type RecipeId = string & { readonly __type: unique symbol };

export enum RecipeState {
  draft = 'draft',
  published = 'published',
}

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
  readonly ingredients: ISaveRecipeIngredientDto[];
}

export type ICreateRecipeInstructionDto = Partial<IRecipeInstructionDto>;

export type ICreateRecipeDto = Partial<
  ISaveRecipeDto & { readonly instructions: ICreateRecipeInstructionDto[] }
> & {
  readonly name: string;
};

export type IPublishRecipeInstructionDto = Partial<IRecipeInstructionDto>;

export type IPublishRecipeDto = ISaveRecipeDto & {
  readonly instructions: IPublishRecipeInstructionDto[];
};

export interface IListRecipesIngredientFilterDto {
  readonly id: IngredientId;
}

export interface IListRecipesQueryDto {
  readonly page: number;
  readonly perPage: number;
  readonly ingredients?: IListRecipesIngredientFilterDto[];
}

export interface IRecipeListItemDto {
  readonly id: RecipeId;
  readonly name: string;
  readonly description: string;
  readonly preparationTime: number;
  readonly portions: number;
  readonly categoryIds: RecipeCategoryId[];
  readonly state: RecipeState;
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

export interface IAddRecipeToFavouritesDto {
  readonly recipeId: RecipeId;
}
