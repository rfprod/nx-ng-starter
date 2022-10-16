import { AppMessage, AppUser, AppUserLoginCredentials, AppUserLogoutCredentials } from '@app/backend-interfaces';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import type { IAuthService } from '../interfaces/auth.interface';
import { AUTH_SERVICE_TOKEN } from '../services/auth.service';

@Controller({
  path: 'auth',
})
export class AppAuthController {
  constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService) {}

  @Get('')
  public ping(): AppMessage {
    return this.authService.ping();
  }

  @Post('login')
  public login(@Body() credentials: AppUserLoginCredentials): AppUser {
    return this.authService.login(credentials);
  }

  @Post('logout')
  public logout(@Body() credentials: AppUserLogoutCredentials): AppMessage {
    return this.authService.logout(credentials);
  }

  @Post('signup')
  public signup(@Body() credentials: AppUserLoginCredentials): AppUser {
    return this.authService.signup(credentials);
  }
}
