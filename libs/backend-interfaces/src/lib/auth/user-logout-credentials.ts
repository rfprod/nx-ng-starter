import { initializeClassProperties } from '../utils/class.util';
import { IUserLogoutCredentials } from './user.interface';

export class UserLogoutCredentials implements IUserLogoutCredentials {
  public token = '';

  constructor(input?: UserLogoutCredentials) {
    initializeClassProperties<UserLogoutCredentials>(this, input);
  }
}
