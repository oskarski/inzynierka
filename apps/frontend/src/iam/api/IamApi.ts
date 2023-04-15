import { Amplify, Auth } from 'aws-amplify';
import { ISignUpDto, UserId } from '@lib/shared';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { env } from '@fe/utils';

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
  readonly accessToken: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface IForgotPasswordDto {
  readonly id?: UserId;
  readonly email: string;
}

export interface IIamApi {
  configure(): void;

  signUp(dto: ISignUpDto): Promise<void>;

  confirmSignUp(dto: IConfirmSignUpDto): Promise<void>;

  signIn(dto: ISignInDto): Promise<ISignedInUserDto>;

  signOut(): Promise<void>;

  signedInUser(): Promise<ISignedInUserDto | null>;

  forgotPassword(dto: IForgotPasswordDto): Promise<void>;

  refreshSession(): Promise<string>;
}

export class IamApi implements IIamApi {
  configure(): void {
    Amplify.configure({
      Auth: env().cognito,
      ssr: true,
    });
  }

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
    const accessToken = loggedInUser.signInUserSession
      .getAccessToken()
      .getJwtToken();

    const attributes = loggedInUser.attributes;

    return {
      id: attributes.sub,
      accessToken,
      email: attributes.email,
      firstName: attributes.given_name,
      lastName: attributes.family_name,
    };
  }

  async signOut(): Promise<void> {
    await Auth.signOut();
  }

  async signedInUser(): Promise<ISignedInUserDto | null> {
    try {
      const loggedInUser = await Auth.currentAuthenticatedUser();

      const attributes = loggedInUser.attributes;
      const accessToken = loggedInUser.signInUserSession
        .getAccessToken()
        .getJwtToken();

      return {
        id: attributes.sub,
        accessToken,
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

  async refreshSession(): Promise<string> {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = cognitoUser.signInUserSession;

    return cognitoUser.refreshSession(
      currentSession.refreshToken,
      (error: Error, session: CognitoUserSession) => {
        // could not refresh session
        if (error) return Promise.reject(error);

        return Promise.resolve(session.getAccessToken().getJwtToken());
      }
    );
  }
}
