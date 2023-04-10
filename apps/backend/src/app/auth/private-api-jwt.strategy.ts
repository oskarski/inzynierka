import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrivateApiJwtStrategy extends PassportStrategy(
  Strategy,
  'private-api-jwt',
) {
  constructor(readonly configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${
          configService.get('cognito').authority
        }/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: configService.get('cognito').authority,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: unknown) {
    return payload && payload['sub'];
  }
}
