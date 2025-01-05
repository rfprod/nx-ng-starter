import { initializeClassProperties } from '../utils/class.util';
import type { IUserLoginCredentials } from './user.interface';

export class AppUserLoginCredentials implements IUserLoginCredentials {
  public email = '';

  public password = '';

  constructor(input?: AppUserLoginCredentials) {
    initializeClassProperties<AppUserLoginCredentials>(this, input);
  }
}
