import { Module } from '@nestjs/common';
import { PrivateApiJwtStrategy } from './private-api-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { IamModule } from '../iam';

@Module({
  imports: [PassportModule, IamModule],
  providers: [PrivateApiJwtStrategy],
})
export class AuthModule {}
