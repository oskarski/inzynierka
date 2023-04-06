import { Auth } from 'aws-amplify';
import { UserId } from '@lib/shared';

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

export interface ISignInDto {
  readonly email: string;
  readonly password: string;
}

export interface ISignedInUserDto {
  readonly id: UserId;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface IForgotPasswordDto {
  readonly id?: UserId;
  readonly email: string;
}

export interface IIamApi {
  signUp(dto: ISignUpDto): Promise<void>;

  confirmSignUp(dto: IConfirmSignUpDto): Promise<void>;

  signIn(dto: ISignInDto): Promise<ISignedInUserDto>;

  signedInUser(): Promise<ISignedInUserDto | null>;

  forgotPassword(dto: IForgotPasswordDto): Promise<void>;
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

  async signIn(dto: ISignInDto): Promise<ISignedInUserDto> {
    const loggedInUser = await Auth.signIn(dto.email, dto.password);

    const attributes = loggedInUser.attributes;

    return {
      id: attributes.sub,
      email: attributes.email,
      firstName: attributes.given_name,
      lastName: attributes.family_name,
    };
  }

  async signedInUser(): Promise<ISignedInUserDto | null> {
    try {
      const loggedInUser = await Auth.currentAuthenticatedUser();

      const attributes = loggedInUser.attributes;

      return {
        id: attributes.sub,
        email: attributes.email,
        firstName: attributes.given_name,
        lastName: attributes.family_name,
      };
    } catch (err) {
      return null;
    }
  }

  async forgotPassword(dto: IForgotPasswordDto): Promise<void> {
    await Auth.forgotPassword(dto.email);
  }
}
