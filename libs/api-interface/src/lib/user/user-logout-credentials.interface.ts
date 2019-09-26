/**
 * User logout credentials interface with initialization.
 */
export class UserLogoutCredentials {
  public token = '';
  constructor(input?: UserLogoutCredentials) {
    if (input) {
      this.token = input.token;
    }
  }
}
