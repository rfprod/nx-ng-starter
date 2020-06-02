/**
 * User contacts interface with initialization.
 */
export class UserContacts {
  public email = '';

  public phone = '';

  constructor(input?: UserContacts) {
    const keys = Boolean(input) ? Object.keys(input) : [];
    for (const key of keys) {
      this[key] = Boolean(input[key]) ? input[key] : this[key];
    }
  }
}
