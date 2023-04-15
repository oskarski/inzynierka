import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { ISignUpDto, UserId } from '@lib/shared';
import { BadRequestException, Injectable } from '@nestjs/common';

export interface ICognitoAdapter {
  signUp(signUpDto: ISignUpDto): Promise<UserId>;
}

@Injectable()
export class CognitoAdapter implements ICognitoAdapter {
  private readonly cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: configService.get('cognito').region,
    });
  }

  async signUp(signUpDto: ISignUpDto): Promise<UserId> {
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
      // TODO Handle error
      throw new BadRequestException();
    }
  }
}
