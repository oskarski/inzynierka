import { apiMethodMock } from './apiMethodMock';
import { IRecipesApi } from '@fe/recipes';

export class RecipesTestApi implements IRecipesApi {
  createRecipe = apiMethodMock<IRecipesApi['createRecipe']>(
    'IRecipesApi.createRecipe'
  );

  listRecipesPaginated = apiMethodMock<IRecipesApi['listRecipesPaginated']>(
    'IRecipesApi.listRecipesPaginated'
  );

  getRecipeDetails = apiMethodMock<IRecipesApi['getRecipeDetails']>(
    'IRecipesApi.getRecipeDetails'
  );
}
