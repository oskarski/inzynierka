import { apiMethodMock } from './apiMethodMock';
import { IFavouriteRecipesApi } from '@fe/recipes';

export class FavouriteRecipesTestApi implements IFavouriteRecipesApi {
  addRecipeToFavorites = apiMethodMock<
    IFavouriteRecipesApi['addRecipeToFavorites']
  >('IFavouriteRecipesApi.addRecipeToFavorites');

  listFavouriteRecipes = apiMethodMock<
    IFavouriteRecipesApi['listFavouriteRecipes']
  >('IFavouriteRecipesApi.listFavouriteRecipes');

  removeRecipeFromFavorites = apiMethodMock<
    IFavouriteRecipesApi['removeRecipeFromFavorites']
  >('IFavouriteRecipesApi.removeRecipeFromFavorites');
}
