import { AppMessage, AppUser, AppUserLoginCredentials, AppUserLogoutCredentials } from '@app/backend-interfaces';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppAuthService } from '../service/auth.service';

@Controller({
  path: 'auth',
})
export class AppAuthController {
  constructor(private readonly authService: AppAuthService) {}

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
