import { IApi } from '@fe/api';
import { IamTestApi } from './IamTestApi';
import { RecipesCategoriesTestApi } from './RecipesCategoriesTestApi';

export class TestApi implements IApi {
  readonly iamApi = new IamTestApi();
  readonly recipesCategoriesApi = new RecipesCategoriesTestApi();
}
