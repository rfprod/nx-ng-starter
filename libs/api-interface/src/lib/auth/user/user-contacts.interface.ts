/**
 * User contacts interface with initialization.
 */
export class UserContacts {
  public email = '';
  public phone = '';
  constructor(input?: UserContacts) {
    if (input) {
      this.email = input.email;
      this.phone = input.phone;
    }
  }
}
