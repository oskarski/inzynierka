import { apiMethodMock } from './apiMethodMock';
import { IIamApi } from '@fe/iam';

export class IamTestApi implements IIamApi {
  signUp = apiMethodMock<IIamApi['signUp']>('IIamApi.signUp');

  confirmSignUp = apiMethodMock<IIamApi['confirmSignUp']>(
    'IIamApi.confirmSignUp'
  );

  signIn = apiMethodMock<IIamApi['signIn']>('IIamApi.signIn');

  signOut = apiMethodMock<IIamApi['signOut']>('IIamApi.signOut');

  signedInUser = apiMethodMock<IIamApi['signedInUser']>('IIamApi.signedInUser');

  forgotPassword = apiMethodMock<IIamApi['forgotPassword']>(
    'IIamApi.forgotPassword'
  );

  confirmForgotPassword = apiMethodMock<IIamApi['confirmForgotPassword']>(
    'IIamApi.confirmForgotPassword'
  );

  refreshSession = apiMethodMock<IIamApi['refreshSession']>(
    'IIamApi.refreshSession'
  );
}
