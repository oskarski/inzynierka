import { apiMethodMock } from './apiMethodMock';
import { IRecipesApi } from '@fe/recipes';

export class RecipesTestApi implements IRecipesApi {
  listRecipesPaginated = apiMethodMock<IRecipesApi['listRecipesPaginated']>(
    'IRecipesApi.listRecipesPaginated'
  );

  getRecipeDetails = apiMethodMock<IRecipesApi['getRecipeDetails']>(
    'IRecipesApi.getRecipeDetails'
  );

  addRecipeToFavorites = apiMethodMock<IRecipesApi['addRecipeToFavorites']>(
    'IRecipesApi.addRecipeToFavorites'
  );

  listFavouriteRecipes = apiMethodMock<IRecipesApi['listFavouriteRecipes']>(
    'IRecipesApi.listFavouriteRecipes'
  );

  removeRecipeFromFavorites = apiMethodMock<
    IRecipesApi['removeRecipeFromFavorites']
  >('IRecipesApi.removeRecipeFromFavorites');
}
