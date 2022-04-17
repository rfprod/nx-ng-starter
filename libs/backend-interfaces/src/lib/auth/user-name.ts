import { initializeClassProperties } from '../utils/class.util';

export class UserName {
  public first = '';

  public last = '';

  constructor(input?: UserName) {
    initializeClassProperties<UserName>(this, input);
  }
}
