import { Module } from '@nestjs/common';
import { PrivateApiJwtStrategy } from './private-api-jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [PrivateApiJwtStrategy],
})
export class AuthModule {}
