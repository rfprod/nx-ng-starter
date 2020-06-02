/**
 * User logout credentials interface with initialization.
 */
export class UserLogoutCredentials {
  public token = '';

  constructor(input?: UserLogoutCredentials) {
    const keys = Boolean(input) ? Object.keys(input) : [];
    for (const key of keys) {
      this[key] = Boolean(input[key]) ? input[key] : this[key];
    }
  }
}
