import { IIamApi } from '@fe/iam';
import { IRecipesCategoriesApi } from '@fe/recipes-categories';
import { IIngredientsApi } from '@fe/ingredients';
import { IFavouriteRecipesApi, IMyRecipesApi, IRecipesApi } from '@fe/recipes';
import { IShoppingListApi } from '@fe/shopping-list';

export interface IApi {
  readonly iamApi: IIamApi;
  readonly recipesCategoriesApi: IRecipesCategoriesApi;
  readonly ingredientsApi: IIngredientsApi;
  readonly recipesApi: IRecipesApi;
  readonly favouriteRecipesApi: IFavouriteRecipesApi;
  readonly myRecipesApi: IMyRecipesApi;
  readonly shoppingListApi: IShoppingListApi;
}
