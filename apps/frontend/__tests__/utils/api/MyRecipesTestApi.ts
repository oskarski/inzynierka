import { apiMethodMock } from './apiMethodMock';
import { IMyRecipesApi } from '@fe/recipes';

export class MyRecipesTestApi implements IMyRecipesApi {
  createRecipe = apiMethodMock<IMyRecipesApi['createRecipe']>(
    'IMyRecipesApi.createRecipe'
  );

  publishRecipe = apiMethodMock<IMyRecipesApi['publishRecipe']>(
    'IMyRecipesApi.publishRecipe'
  );

  createAndPublishRecipe = apiMethodMock<
    IMyRecipesApi['createAndPublishRecipe']
  >('IMyRecipesApi.createAndPublishRecipe');
}
