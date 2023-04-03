import { IIamApi } from '@fe/iam';
import { IRecipesCategoriesApi } from '@fe/recipes-categories';
import { IIngredientsApi } from '@fe/ingredients';

export interface IApi {
  readonly iamApi: IIamApi;
  readonly recipesCategoriesApi: IRecipesCategoriesApi;
  readonly ingredientsApi: IIngredientsApi;
}
