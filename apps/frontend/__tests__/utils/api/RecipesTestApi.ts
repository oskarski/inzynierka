import { apiMethodMock } from './apiMethodMock';
import { IRecipesApi } from '@fe/recipes';

export class RecipesTestApi implements IRecipesApi {
  findRecipesPaginated = apiMethodMock<IRecipesApi['findRecipesPaginated']>(
    'IRecipesApi.findRecipesPaginated'
  );
}
