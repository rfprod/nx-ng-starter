import { initializeClassProperties } from '../utils/class.util';
import { IUser } from './user.interface';
import { UserName } from './user-name';

export class User implements IUser {
  public id = '';

  public name: UserName = new UserName();

  public token = '';

  constructor(input?: User) {
    initializeClassProperties<User>(this, input);
  }
}
