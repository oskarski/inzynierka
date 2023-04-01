import { Auth } from 'aws-amplify';

export interface ISignUpDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface IConfirmSignUpDto {
  readonly email: string;
  readonly code: string;
}

export interface IIamApi {
  signUp(dto: ISignUpDto): Promise<void>;

  confirmSignUp(dto: IConfirmSignUpDto): Promise<void>;
}

export class IamApi implements IIamApi {
  async signUp(dto: ISignUpDto): Promise<void> {
    await Auth.signUp({
      username: dto.email,
      password: dto.password,
      attributes: {
        given_name: dto.firstName,
        family_name: dto.lastName,
      },
    });
  }

  async confirmSignUp(dto: IConfirmSignUpDto): Promise<void> {
    await Auth.confirmSignUp(dto.email, dto.code);
  }
}
