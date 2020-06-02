/**
 * User login credentials interface with initialization.
 */
export class UserLoginCredentials {
  public email = '';

  public password = '';

  constructor(input?: UserLoginCredentials) {
    const keys = Boolean(input) ? Object.keys(input) : [];
    for (const key of keys) {
      this[key] = Boolean(input[key]) ? input[key] : this[key];
    }
  }
}
