import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_STRATEGY_NAME } from './local.strategy';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY_NAME) {
  override canActivate(context: any) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  override getRequest(context: any) {
    return super.getRequest(context);
  }

  override logIn<TRequest extends { logIn: Function } = any>(
    request: TRequest,
  ) {
    return super.logIn(request);
  }

  override getAuthenticateOptions(context: any) {
    return super.getAuthenticateOptions(context);
  }

  override handleRequest(
    err: any,
    user: any,
    info: any,
    context: any,
    status: any,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException('LocalAuthGuard.handleRequest()');
    }
    return user;
  }
}
