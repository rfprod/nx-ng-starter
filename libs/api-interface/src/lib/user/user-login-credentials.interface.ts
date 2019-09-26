/**
 * User login credentials interface with initialization.
 */
export class UserLoginCredentials {
  public email = '';
  public password = '';
  constructor(input?: UserLoginCredentials) {
    if (input) {
      this.email = input.email;
      this.password = input.password;
    }
  }
}
