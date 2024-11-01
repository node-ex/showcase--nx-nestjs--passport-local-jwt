import { Controller, Post, UseGuards, Get, Req, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto, @Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.authService.login(req.user!);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('dummy')
  getDummyData(@Req() req: Request) {
    const user = req.user;
    return {
      message: 'This is protected dummy data',
      user,
    };
  }
}
