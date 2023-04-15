import { ICognitoAdapter } from '../../app/iam/cognito.adapter';
import { ISignUpDto, UserId } from '@lib/shared';

export class CognitoTestAdapter implements ICognitoAdapter {
  signUp = jest.fn<Promise<UserId>, [ISignUpDto]>();
}
