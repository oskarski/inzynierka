import { IRecipesCategoriesApi } from '@fe/recipes-categories';
import { apiMethodMock } from './apiMethodMock';

export class RecipesCategoriesTestApi implements IRecipesCategoriesApi {
  listCategories = apiMethodMock<IRecipesCategoriesApi['listCategories']>(
    'IRecipesCategoriesApi.listCategories'
  );
}
