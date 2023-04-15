import { Injectable } from '@nestjs/common';
import { ISignUpDto, UserId } from '@lib/shared';
import { UserRepository } from '../repositories';
import { CognitoAdapter } from '../cognito.adapter';
import { User } from '../entities';

@Injectable()
export class IamService {
  constructor(
    private readonly cognitoAdapter: CognitoAdapter,
    private readonly usersRepository: UserRepository,
  ) {}

  async signUp(signUpDto: ISignUpDto): Promise<UserId> {
    const userId = await this.cognitoAdapter.signUp(signUpDto);

    await this.usersRepository.createUser(User.notConfirmed(userId));

    return userId;
  }
}
