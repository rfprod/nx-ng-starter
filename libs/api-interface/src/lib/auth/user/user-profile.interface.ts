import { UserContacts } from './user-contacts.interface';
import { UserName } from './user-name.interface';
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
    const keys = Boolean(input) ? Object.keys(input) : [];
    for (const key of keys) {
      this[key] = Boolean(input[key]) ? input[key] : this[key];
    }
  }
}
