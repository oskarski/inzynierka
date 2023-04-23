import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../iam/entities';

export const CurrentUser = createParamDecorator(
  (_data: undefined, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();

    // This is user returned in PrivateApiJwtStrategy
    return request.user;
  },
);
