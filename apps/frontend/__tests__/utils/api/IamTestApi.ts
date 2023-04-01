import { apiMethodMock } from './apiMethodMock';
import { IIamApi } from '@fe/iam';

export class IamTestApi implements IIamApi {
  signUp = apiMethodMock<IIamApi['signUp']>('IIamApi.signUp');

  confirmSignUp = apiMethodMock<IIamApi['confirmSignUp']>(
    'IIamApi.confirmSignUp'
  );

  signIn = apiMethodMock<IIamApi['signIn']>('IIamApi.signIn');
}
