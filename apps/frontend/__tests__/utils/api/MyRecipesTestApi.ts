import { apiMethodMock } from './apiMethodMock';
import { IMyRecipesApi } from '@fe/recipes';

export class MyRecipesTestApi implements IMyRecipesApi {
  createRecipe = apiMethodMock<IMyRecipesApi['createRecipe']>(
    'IMyRecipesApi.createRecipe'
  );

  createAndPublishRecipe = apiMethodMock<
    IMyRecipesApi['createAndPublishRecipe']
  >('IMyRecipesApi.createAndPublishRecipe');

  listMyRecipes = apiMethodMock<IMyRecipesApi['listMyRecipes']>(
    'IMyRecipesApi.listMyRecipes'
  );

  publishRecipe = apiMethodMock<IMyRecipesApi['publishRecipe']>(
    'IMyRecipesApi.publishRecipe'
  );

  unpublishRecipe = apiMethodMock<IMyRecipesApi['unpublishRecipe']>(
    'IMyRecipesApi.unpublishRecipe'
  );

  deleteRecipe = apiMethodMock<IMyRecipesApi['deleteRecipe']>(
    'IMyRecipesApi.deleteRecipe'
  );
}
