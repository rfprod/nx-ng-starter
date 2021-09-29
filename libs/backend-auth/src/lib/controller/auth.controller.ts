import { Message, UserLoginCredentials, UserLogoutCredentials, UserProfile } from '@app/backend-interfaces';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { BackendAuthService } from '../service/auth.service';

@Controller({
  path: 'auth',
})
export class BackendAuthController {
  constructor(private readonly authService: BackendAuthService) {}

  @Get('')
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
