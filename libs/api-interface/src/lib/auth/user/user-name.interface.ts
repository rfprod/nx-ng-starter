/**
 * User name interface with initialization.
 */
export class UserName {
  public first = '';

  public last = '';

  constructor(input?: UserName) {
    const keys = Boolean(input) ? Object.keys(input) : [];
    for (const key of keys) {
      this[key] = Boolean(input[key]) ? input[key] : this[key];
    }
  }
}
