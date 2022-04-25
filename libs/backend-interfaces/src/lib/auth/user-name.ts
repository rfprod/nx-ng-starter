import { initializeClassProperties } from '../utils/class.util';

export class AppUserName {
  public first = '';

  public last = '';

  constructor(input?: AppUserName) {
    initializeClassProperties<AppUserName>(this, input);
  }
}
