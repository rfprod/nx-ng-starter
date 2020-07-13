/**
 * User contacts interface with initialization.
 */
export class UserContacts {
  public email = '';

  public phone = '';

  constructor(input?: UserContacts) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}
