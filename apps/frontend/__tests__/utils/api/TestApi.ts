import { IApi } from '@fe/api';
import { RecipesCategoriesTestApi } from './RecipesCategoriesTestApi';

export class TestApi implements IApi {
  readonly recipesCategoriesApi = new RecipesCategoriesTestApi();
}
