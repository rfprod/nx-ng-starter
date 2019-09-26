export class UserToken {
  public token = '';
  public salt? = '';
  constructor(input?: UserToken) {
    if (input) {
      this.token = input.token;
      this.salt = input.salt ? input.salt : this.salt;
    }
  }
}
