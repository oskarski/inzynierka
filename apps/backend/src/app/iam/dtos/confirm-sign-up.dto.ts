import { IConfirmSignUpDto } from '@lib/shared';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ConfirmSignUpDto implements IConfirmSignUpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  readonly code: string;
}
