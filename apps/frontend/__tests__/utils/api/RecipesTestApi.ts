import { apiMethodMock } from './apiMethodMock';
import { IRecipesApi } from '@fe/recipes';

export class RecipesTestApi implements IRecipesApi {
  listPaginatedRecipes = apiMethodMock<IRecipesApi['listPaginatedRecipes']>(
    'IRecipesApi.listPaginatedRecipes'
  );

  getRecipeDetails = apiMethodMock<IRecipesApi['getRecipeDetails']>(
    'IRecipesApi.getRecipeDetails'
  );

  addRecipeToFavorites = apiMethodMock<IRecipesApi['addRecipeToFavorites']>(
    'IRecipesApi.addRecipeToFavorites'
  );
}
