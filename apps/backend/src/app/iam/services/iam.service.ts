import { Injectable } from '@nestjs/common';
import { UserId } from '@lib/shared';
import { UserRepository } from '../repositories';
import { CognitoAdapter } from '../cognito.adapter';
import { User } from '../entities';
import { SignUpDto, ConfirmSignUpDto } from '../dtos';

@Injectable()
export class IamService {
  constructor(
    private readonly cognitoAdapter: CognitoAdapter,
    private readonly usersRepository: UserRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<UserId> {
    const userId = await this.cognitoAdapter.signUp(signUpDto);

    await this.usersRepository.createUser(User.notConfirmed(userId));

    return userId;
  }

  async confirmSignUp(
    userId: UserId,
    confirmSignUpDto: ConfirmSignUpDto,
  ): Promise<UserId> {
    await this.usersRepository.findUnconfirmedUser(userId);

    await this.cognitoAdapter.confirmSignUp(confirmSignUpDto);

    await this.usersRepository.confirmUser(userId);

    return userId;
  }
}
