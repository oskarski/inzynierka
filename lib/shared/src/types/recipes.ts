import { RecipeCategoryId } from './recipe-categories';
import { IngredientId } from './ingredients';
import { UserId } from './iam';

export type RecipeId = string & { readonly __type: unique symbol };

export enum RecipeState {
  draft = 'draft',
  published = 'published',
}

export enum RecipeDifficulty {
  easy = '100',
  medium = '200',
  difficult = '300',
}

export interface ISaveRecipeIngredientDto {
  readonly id: IngredientId;
  readonly quantity: number;
  readonly unit: string;
}

interface ISaveRecipeDto {
  readonly name: string;
  readonly description: string;
  readonly difficulty: RecipeDifficulty;
  readonly dietType?: RecipeCategoryId[];
  readonly dishType?: RecipeCategoryId[];
  readonly cuisineType?: RecipeCategoryId[];
  readonly preparationTime: number;
  readonly portions: number;
  readonly ingredients: ISaveRecipeIngredientDto[];
}

export type IDraftRecipeInstructionDto = Partial<IRecipeInstructionDto>;

export interface ISaveDraftRecipeDto extends Partial<ISaveRecipeDto> {
  readonly instructions?: IDraftRecipeInstructionDto[];
  readonly name: string;
}

export interface IPublishRecipeDto extends ISaveRecipeDto {
  readonly instructions: IRecipeInstructionDto[];
}

export interface IListRecipesIngredientFilterDto {
  readonly id: IngredientId;
}

export interface IListRecipesPreparationTimeFiltersDto {
  readonly minPreparationTime?: number;
  readonly maxPreparationTime?: number;
}

export interface IListRecipesCategoryFiltersDto {
  readonly dishTypeCategoryIds?: RecipeCategoryId[];
  readonly cuisineTypeCategoryIds?: RecipeCategoryId[];
  readonly dietTypeCategoryIds?: RecipeCategoryId[];
  readonly otherCategoryIds?: RecipeCategoryId[];
}

export interface IListRecipesDifficultyFiltersDto {
  readonly difficulty?: RecipeDifficulty[];
}

export interface IListRecipesReviewFiltersDto {
  readonly minReview?: number;
}

export interface IListRecipesFiltersDto
  extends IListRecipesPreparationTimeFiltersDto,
    IListRecipesCategoryFiltersDto,
    IListRecipesDifficultyFiltersDto,
    IListRecipesReviewFiltersDto {}

export interface IListRecipesQueryDto extends IListRecipesFiltersDto {
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
  readonly ingredientsCoverage?: number;
  readonly review: number | null;
  readonly coverImage: string | null;
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
  readonly state: RecipeState;
  readonly difficulty: RecipeDifficulty;
  readonly authorId: UserId | null;
  readonly review: number | null;
  readonly coverImage: string | null;
}

export interface IAddRecipeToFavouritesDto {
  readonly recipeId: RecipeId;
}
