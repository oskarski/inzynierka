import { IRecipesCategoriesApi } from '@fe/recipes-categories';
import { apiMethodMock } from './apiMethodMock';

export class RecipesCategoriesTestApi implements IRecipesCategoriesApi {
  listAllCategories = apiMethodMock<IRecipesCategoriesApi['listAllCategories']>(
    'IRecipesCategoriesApi.listAllCategories'
  );
}
