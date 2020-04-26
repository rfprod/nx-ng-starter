import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Message,
  UserLoginCredentials,
  UserLogoutCredentials,
  UserProfile,
} from '@nx-ng-starter/api-interface';

import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('ping')
  public ping(): Message {
    return this.authService.ping();
  }

  @Post('login')
  public login(@Body() credentials: UserLoginCredentials): UserProfile {
    return this.authService.login(credentials);
  }

  @Post('logout')
  public logout(@Body() credentials: UserLogoutCredentials): Message {
    return this.authService.logout(credentials);
  }

  @Post('signup')
  public signup(@Body() credentials: UserLoginCredentials): UserProfile {
    return this.authService.signup(credentials);
  }
}
