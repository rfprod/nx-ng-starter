/**
 * User name interface with initialization.
 */
export class UserName {
  public first = '';

  public last = '';

  constructor(input?: UserName) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}
