import { Body, Controller, Param, Post } from '@nestjs/common';
import { IamService } from './services';
import { SignUpDto, ConfirmSignUpDto } from './dtos';
import { UserId } from '@lib/shared';

@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<UserId> {
    return this.iamService.signUp(signUpDto);
  }

  @Post('/sign-up/:userId/confirm')
  async confirmSignUp(
    @Param('userId') userId: UserId,
    @Body() confirmSignUpDto: ConfirmSignUpDto,
  ): Promise<UserId> {
    return this.iamService.confirmSignUp(userId, confirmSignUpDto);
  }
}
