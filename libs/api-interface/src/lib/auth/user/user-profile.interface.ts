import { UserName } from './user-name.interface';

import { UserContacts } from './user-contacts.interface';
import { UserToken } from './user-token.interface';

/**
 * User profile interface with initialization.
 */
export class UserProfile {
  public id = '';
  public name: UserName = new UserName();
  public contacts: UserContacts = new UserContacts();
  public token: UserToken = new UserToken();
  constructor(input?: UserProfile) {
    if (input) {
      this.id = input.id;
      this.name = input.name;
      this.contacts = input.contacts;
      this.token = input.token;
    }
  }
}
