/**
 * User name interface with initialization.
 */
export class UserName {
  public first = '';
  public last = '';
  constructor(input?: UserName) {
    if (input) {
      this.first = input.first;
      this.last = input.last;
    }
  }
}
