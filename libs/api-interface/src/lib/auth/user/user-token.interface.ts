export class UserToken {
  public token = '';

  public salt? = '';

  constructor(input?: UserToken) {
    const keys = Boolean(input) ? Object.keys(input) : [];
    for (const key of keys) {
      this[key] = Boolean(input[key]) ? input[key] : this[key];
    }
  }
}
