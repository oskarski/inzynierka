import { apiMethodMock } from './apiMethodMock';
import { IIamApi } from '@fe/iam';

export class IamTestApi implements IIamApi {
  signUp = apiMethodMock<IIamApi['signUp']>('IIamApi.signUp');
}
