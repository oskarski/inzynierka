import { IIamApi } from '@fe/iam';
import { IRecipesCategoriesApi } from '@fe/recipes-categories';
import { IIngredientsApi } from '@fe/ingredients';
import { IFavouriteRecipesApi, IMyRecipesApi, IRecipesApi } from '@fe/recipes';

export interface IApi {
  readonly iamApi: IIamApi;
  readonly recipesCategoriesApi: IRecipesCategoriesApi;
  readonly ingredientsApi: IIngredientsApi;
  readonly recipesApi: IRecipesApi;
  readonly favouriteRecipesApi: IFavouriteRecipesApi;
  readonly myRecipesApi: IMyRecipesApi;
}
