import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY_NAME } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_NAME) {
  override canActivate(context: any) {
    return super.canActivate(context);
  }

  override handleRequest(
    err: any,
    user: any,
    info: any,
    context: any,
    status: any,
  ) {
    return super.handleRequest(err, user, info, context, status);
  }

  override getAuthenticateOptions(context: any) {
    return super.getAuthenticateOptions(context);
  }

  override getRequest(context: any) {
    return super.getRequest(context);
  }

  override logIn<TRequest extends { logIn: Function } = any>(
    request: TRequest,
  ) {
    return super.logIn(request);
  }
}
