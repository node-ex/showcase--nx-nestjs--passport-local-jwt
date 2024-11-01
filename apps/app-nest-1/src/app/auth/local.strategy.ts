import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  static usernameField = 'username';
  static passwordField = 'password';

  constructor(private authService: AuthService) {
    super({
      usernameField: LocalStrategy.usernameField,
      passwordField: LocalStrategy.passwordField,
      session: false,
    });
  }

  validate(username: string, password: string) {
    console.log('LocalStrategy.validate()', username, password);
    const user = this.authService.validateUser(username, password);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!user) {
      throw new UnauthorizedException('some unauthorized error');
    }
    return user;
  }

  override fail(challenge: unknown, status?: unknown): void {
    console.log('LocalStrategy.fail()', challenge, status);
    // @ts-expect-error status should be a number
    super.fail(challenge, status);
  }

  override error(err: Error): void {
    console.log('LocalStrategy.error()', err);
    super.error(err);
  }

  override authenticate(req: Request, options?: any): void {
    console.log('LocalStrategy.authenticate()', options);
    super.authenticate(req, {
      ...options,
      badRequestMessage: 'some bad request error',
    });
  }
}
