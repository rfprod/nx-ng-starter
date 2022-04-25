import { initializeClassProperties } from '../utils/class.util';
import { IUserLogoutCredentials } from './user.interface';

export class AppUserLogoutCredentials implements IUserLogoutCredentials {
  public token = '';

  constructor(input?: AppUserLogoutCredentials) {
    initializeClassProperties<AppUserLogoutCredentials>(this, input);
  }
}
