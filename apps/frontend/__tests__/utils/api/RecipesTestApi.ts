import { apiMethodMock } from './apiMethodMock';
import { IRecipesApi } from '@fe/recipes';

export class RecipesTestApi implements IRecipesApi {
  listPaginatedRecipes = apiMethodMock<IRecipesApi['listPaginatedRecipes']>(
    'IRecipesApi.listPaginatedRecipes'
  );
}
