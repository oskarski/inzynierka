import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { IamService } from '../iam/services';
import { UserId } from '@lib/shared';
import { User } from '../iam/entities';

@Injectable()
export class PrivateApiJwtStrategy extends PassportStrategy(
  Strategy,
  'private-api-jwt',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly iamService: IamService,
  ) {
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

  async validate(payload: unknown): Promise<User> {
    const userId: undefined | UserId = payload && payload['sub'];

    if (!userId) throw new UnauthorizedException();

    const user = await this.iamService.getConfirmedUser(userId);

    if (!user) throw new UnauthorizedException();
    if (!user.isConfirmed())
      throw new UnauthorizedException('User is not confirmed!');

    return user;
  }
}
