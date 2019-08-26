import { Controller, Get, Post } from '@nestjs/common';

import { Message, UserProfile } from '@nx-ng-starter/api-interface';

import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Get('hello')
  public getData(): Message {
    return this.authService.getData();
  }

  @Post('login')
  public login(): UserProfile {
    return this.authService.login();
  }

  @Post('logout')
  public logout(): Message {
    return this.authService.logout();
  }

}
