import { Body, Controller, Post } from '@nestjs/common';
import { IamService } from './services';
import { SignUpDto } from './dtos';
import { UserId } from '@lib/shared';

@Controller('iam')
export class IamController {
  constructor(private readonly iamService: IamService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<UserId> {
    return this.iamService.signUp(signUpDto);
  }
}
