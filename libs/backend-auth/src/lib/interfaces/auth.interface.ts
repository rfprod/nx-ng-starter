import { AppMessage, AppUser, AppUserLoginCredentials, AppUserLogoutCredentials } from '@app/backend-interfaces';

export interface IAuthPayload {
  email: string;
  name: string;
}

export interface IAuthTokenObject extends IAuthPayload {
  iat: number;
}

export interface IAuthService {
  generateJWToken(payload: IAuthPayload): string;

  decodeJWToken(token: string): IAuthTokenObject;

  ping(): AppMessage;

  login(credentials: AppUserLoginCredentials): AppUser;

  logout(credentials: AppUserLogoutCredentials): AppMessage;

  signup(credentials: AppUserLoginCredentials): AppUser;
}
