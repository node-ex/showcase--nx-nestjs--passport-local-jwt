import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Request } from 'express';

export const LOCAL_STRATEGY_NAME = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_NAME,
) {
  static usernameField = 'username';
  static passwordField = 'password';

  constructor(private authService: AuthService) {
    super({
      usernameField: LocalStrategy.usernameField,
      passwordField: LocalStrategy.passwordField,
      session: false,
    });
  }

  override authenticate(req: Request, options?: any): void {
    super.authenticate(req, {
      ...options,
      badRequestMessage: 'some bad request error',
    });
  }

  validate(username: string, password: string) {
    const user = this.authService.validateUser(username, password);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!user) {
      throw new UnauthorizedException('some unauthorized error');
    }
    return user;
  }
}
