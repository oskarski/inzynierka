import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivateApiGuard extends AuthGuard('private-api-jwt') {}
