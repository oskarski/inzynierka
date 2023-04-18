import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserId } from '@lib/shared';

export const CurrentUser = createParamDecorator(
  (_data: undefined, ctx: ExecutionContext): UserId => {
    const request = ctx.switchToHttp().getRequest();

    // This is user returned in PrivateApiJwtStrategy
    return request.user;
  },
);
