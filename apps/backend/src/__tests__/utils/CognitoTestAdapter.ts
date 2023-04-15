import { ICognitoAdapter } from '../../app/iam/cognito.adapter';
import { IConfirmSignUpDto, ISignUpDto, UserId } from '@lib/shared';

export class CognitoTestAdapter implements ICognitoAdapter {
  signUp = jest.fn<Promise<UserId>, [ISignUpDto]>();

  confirmSignUp = jest.fn<Promise<void>, [IConfirmSignUpDto]>();
}
