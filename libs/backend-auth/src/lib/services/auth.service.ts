import { AppMessage, AppUser, AppUserLoginCredentials, AppUserLogoutCredentials, AppUserName } from '@app/backend-interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IAuthPayload, IAuthService, IAuthTokenObject } from '../interfaces/auth.interface';

export const AUTH_SERVICE_TOKEN = Symbol('AUTH_SERVICE_TOKEN');

@Injectable()
export class AppAuthService implements IAuthService {
  constructor(private readonly jwt: JwtService) {}

  public generateJWToken(payload: IAuthPayload) {
    const token = this.jwt.sign(payload);
    return token;
  }

  public decodeJWToken(token: string) {
    const result = <IAuthTokenObject>this.jwt.decode(token);
    return result;
  }

  public ping(): AppMessage {
    return new AppMessage({
      message: 'Auth service is online. Public methods: login, logout, signup.',
    });
  }

  public login(credentials: AppUserLoginCredentials): AppUser {
    return this.authenticateAndReturnProfile(credentials);
  }

  public logout(credentials: AppUserLogoutCredentials): AppMessage {
    return new AppMessage({ message: `success for token ${credentials.token}` });
  }

  public signup(credentials: AppUserLoginCredentials): AppUser {
    return this.authenticateAndReturnProfile(credentials);
  }

  private authenticateAndReturnProfile(credentials: AppUserLoginCredentials): AppUser {
    const name = new AppUserName({
      first: '',
      last: '',
    });
    const profile = new AppUser({
      id: '0',
      name,
      token: this.generateJWToken({
        email: credentials.email,
        name: `${name.first} ${name.last}`,
      }),
    });
    return profile;
  }
}
