/**
 * Application user.
 */
export class AppUser {
  public email = '';

  public admin = false;

  public token = '';

  /**
   * Constructor.
   * @param email user email
   * @param admin indicates if user has admin privileges
   * @param token user token
   */
  constructor(email?: string, admin?: boolean, token?: string) {
    this.email = email ? email : this.email;
    this.admin = admin ? admin : this.admin;
    this.token = token ? token : this.token;
  }
}
