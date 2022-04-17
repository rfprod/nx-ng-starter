import { initializeClassProperties } from '../utils/class.util';
import { IUserLoginCredentials } from './user.interface';

export class UserLoginCredentials implements IUserLoginCredentials {
  public email = '';

  public password = '';

  constructor(input?: UserLoginCredentials) {
    initializeClassProperties<UserLoginCredentials>(this, input);
  }
}
