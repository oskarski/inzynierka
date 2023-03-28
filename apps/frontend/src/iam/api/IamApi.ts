import { Auth } from 'aws-amplify';

export interface ISignUpDto {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface IIamApi {
  signUp(dto: ISignUpDto): Promise<void>;
}

export class IamApi implements IIamApi {
  constructor() {}

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
}
