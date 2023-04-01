import { IIamApi } from '@fe/iam';
import { IRecipesCategoriesApi } from '@fe/recipes-categories';

export interface IApi {
  readonly iamApi: IIamApi;
  readonly recipesCategoriesApi: IRecipesCategoriesApi;
}
