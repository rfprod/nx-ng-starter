/**
 * User login credentials interface with initialization.
 */
export class UserLoginCredentials {
  public email = '';

  public password = '';

  constructor(input?: UserLoginCredentials) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}
