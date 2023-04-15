import Auth from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import { IConfirmSignUpDto, ISignUpDto, UserId } from '@lib/shared';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { env, HttpClient } from '@fe/utils';

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

  signUp(dto: ISignUpDto): Promise<UserId>;

  confirmSignUp(userId: UserId, dto: IConfirmSignUpDto): Promise<void>;

  signIn(dto: ISignInDto): Promise<ISignedInUserDto>;

  signOut(): Promise<void>;

  signedInUser(): Promise<ISignedInUserDto | null>;

  forgotPassword(dto: IForgotPasswordDto): Promise<void>;

  refreshSession(): Promise<string>;
}

export class IamApi implements IIamApi {
  private readonly baseUrl = '/iam';

  constructor(private readonly httpClient: HttpClient) {}

  configure(): void {
    Amplify.configure({
      Auth: env().cognito,
      ssr: true,
    });
  }

  async signUp(dto: ISignUpDto): Promise<UserId> {
    return this.httpClient.post<ISignUpDto, UserId>(
      `${this.baseUrl}/sign-up`,
      dto
    );
  }

  async confirmSignUp(userId: UserId, dto: IConfirmSignUpDto): Promise<void> {
    return this.httpClient.post<IConfirmSignUpDto, void>(
      `${this.baseUrl}/sign-up/${userId}/confirm`,
      dto
    );
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
