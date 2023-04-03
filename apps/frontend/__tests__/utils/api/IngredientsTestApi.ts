import { apiMethodMock } from './apiMethodMock';
import { IIngredientsApi } from '@fe/ingredients';

export class IngredientsTestApi implements IIngredientsApi {
  listIngredients = apiMethodMock<IIngredientsApi['listIngredients']>(
    'IIngredientsApi.listIngredients'
  );
}
