import { IApi } from '@fe/api';
import { IamTestApi } from './IamTestApi';
import { IngredientsTestApi } from './IngredientsTestApi';
import { RecipesCategoriesTestApi } from './RecipesCategoriesTestApi';
import { RecipesTestApi } from './RecipesTestApi';
import { FavouriteRecipesTestApi } from './FavouriteRecipesTestApi';

export class TestApi implements IApi {
  readonly iamApi = new IamTestApi();
  readonly recipesCategoriesApi = new RecipesCategoriesTestApi();
  readonly ingredientsApi = new IngredientsTestApi();
  readonly recipesApi = new RecipesTestApi();
  readonly favouriteRecipesApi = new FavouriteRecipesTestApi();
}
