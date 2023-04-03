import { IApi } from '@fe/api';
import { IamTestApi } from './IamTestApi';
import { IngredientsTestApi } from './IngredientsTestApi';
import { RecipesCategoriesTestApi } from './RecipesCategoriesTestApi';

export class TestApi implements IApi {
  readonly iamApi = new IamTestApi();
  readonly recipesCategoriesApi = new RecipesCategoriesTestApi();
  readonly ingredientsApi = new IngredientsTestApi();
}
