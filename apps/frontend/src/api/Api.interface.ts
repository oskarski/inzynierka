import { IIamApi } from '@fe/iam';
import { IRecipesCategoriesApi } from '@fe/recipes-categories';
import { IIngredientsApi } from '@fe/ingredients';
import { IRecipesApi } from '@fe/recipes';

export interface IApi {
  readonly iamApi: IIamApi;
  readonly recipesCategoriesApi: IRecipesCategoriesApi;
  readonly ingredientsApi: IIngredientsApi;
  readonly recipesApi: IRecipesApi;
}
