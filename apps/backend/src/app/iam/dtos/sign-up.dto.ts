import { ISignUpDto } from '@lib/shared';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto implements ISignUpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  readonly password: string;
}
