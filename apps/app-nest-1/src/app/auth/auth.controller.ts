import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    /*
     * This DTO is used here for communication purposes only, because
     * Passport-based guard checks the same values earlier in the request
     * lifecycle, then Validation pipe that validates this DTO.
     * It must have the same properties as values of the usernameField and
     * passwordField in the LocalStrategy class.
     */
    @Body() _loginDto: LoginDto,
    @Req() req: Request,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.authService.login(req.user!);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dummy')
  getDummyData(@Req() req: Request) {
    const user = req.user;
    return {
      message: 'This is protected dummy data',
      user,
    };
  }
}
