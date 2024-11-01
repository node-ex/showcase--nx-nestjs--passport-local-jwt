import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
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
