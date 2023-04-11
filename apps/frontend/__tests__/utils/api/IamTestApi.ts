import { apiMethodMock } from './apiMethodMock';
import { IIamApi } from '@fe/iam';

export class IamTestApi implements IIamApi {
  configure = jest.fn<void, []>();

  signUp = apiMethodMock<IIamApi['signUp']>('IIamApi.signUp');

  confirmSignUp = apiMethodMock<IIamApi['confirmSignUp']>(
    'IIamApi.confirmSignUp'
  );

  signIn = apiMethodMock<IIamApi['signIn']>('IIamApi.signIn');

  signOut = apiMethodMock<IIamApi['signOut']>('IIamApi.signOut');

  signedInUser = apiMethodMock<IIamApi['signedInUser']>('IIamApi.signedInUser');

  refreshSession = apiMethodMock<IIamApi['refreshSession']>(
    'IIamApi.refreshSession'
  );
}
