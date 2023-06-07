import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { ISignUpDto, UserId } from '@lib/shared';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfirmSignUpDto, SignUpDto } from './dtos';

export interface ICognitoAdapter {
  signUp(signUpDto: ISignUpDto): Promise<UserId>;

  confirmSignUp(confirmSignUpDto: ConfirmSignUpDto): Promise<void>;
}

@Injectable()
export class CognitoAdapter implements ICognitoAdapter {
  private readonly cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: configService.get('cognito').region,
    });
  }

  async signUp(signUpDto: SignUpDto): Promise<UserId> {
    try {
      const signUpCommand = new SignUpCommand({
        ClientId: this.configService.get('cognito').clientId,
        Username: signUpDto.email,
        Password: signUpDto.password,
        UserAttributes: [
          {
            Name: 'given_name',
            Value: signUpDto.firstName,
          },
          {
            Name: 'family_name',
            Value: signUpDto.lastName,
          },
        ],
      });

      const signUpResponse = await this.cognitoClient.send(signUpCommand);

      return signUpResponse.UserSub as UserId;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async confirmSignUp(confirmSignUpDto: ConfirmSignUpDto): Promise<void> {
    try {
      const confirmSignUpCommand = new ConfirmSignUpCommand({
        ClientId: this.configService.get('cognito').clientId,
        Username: confirmSignUpDto.email,
        ConfirmationCode: confirmSignUpDto.code,
      });

      await this.cognitoClient.send(confirmSignUpCommand);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
