import { initializeClassProperties } from '../utils/class.util';
import { IUser } from './user.interface';
import { AppUserName } from './user-name';

export class AppUser implements IUser {
  public id = '';

  public name: AppUserName = new AppUserName();

  public token = '';

  constructor(input?: AppUser) {
    initializeClassProperties<AppUser>(this, input);
  }
}
