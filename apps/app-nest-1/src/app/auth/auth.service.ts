import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly hardcodedUsername = 'test-username';
  private readonly hardcodedPassword = 'test-password';

  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string) {
    console.log('AuthService.validateUser()', username, password);
    if (
      username === this.hardcodedUsername &&
      password === this.hardcodedPassword
    ) {
      return { id: 1, username: this.hardcodedUsername };
    }

    throw new Error('Invalid credentials');
  }

  login(user: { id: number; username: string }) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
