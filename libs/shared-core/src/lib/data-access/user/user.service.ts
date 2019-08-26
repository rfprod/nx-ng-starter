import { Injectable } from '@angular/core';

import { AppUser } from '../interfaces';

import { BehaviorSubject } from 'rxjs';

/**
 * User service.
 * Wrapper around browser local storage.
 */
@Injectable()
export class UserService {

  /**
   * User service model.
   */
  private model: AppUser;

  /**
   * Initializes user model.
   */
  private initializeModel(): void {
    this.model = new AppUser();
  }

  /**
   * Restores user on service initialization.
   */
  private restoreUserOnInit(): void {
    if (
      !localStorage.getItem('userService') &&
      typeof localStorage.getItem('userService') === 'undefined'
    ) {
      localStorage.setItem('userService', JSON.stringify(this.model));
    } else {
      this.restoreUser();
    }
  }

  /**
   * Constructor.
   */
  constructor() {
    this.initializeModel();
    this.restoreUserOnInit();
  }

  /**
   * Retrieves user service model.
   */
  public getUser(): AppUser {
    return this.model;
  }

  /**
   * Indicates if user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.model.token ? true : false;
  }

  /**
   * Resolves if user has administrative privileges.
   */
  public isAdmin(): boolean {
    return this.model.token && this.model.admin;
  }

  /**
   * Notifies when user login state changes.
   */
  public isLoggedInSubscription: BehaviorSubject<AppUser> = new BehaviorSubject(this.model);

  /**
   * Updates user service model with new values.
   * @param newValues new values object
   */
  public saveUser(newValues: Partial<AppUser>): AppUser {
    Object.assign(this.model, newValues);
    console.log('save user >>', this.model);
    localStorage.setItem('userService', JSON.stringify(this.model));
    if ('token' in newValues) {
      this.isLoggedInSubscription.next(this.model);
    }
    return this.model;
  }

  /**
   * Restores user service model.
   */
  public restoreUser(): void {
    if (
      localStorage.getItem('userService') &&
      typeof localStorage.getItem('userService') !== 'undefined'
    ) {
      this.model = JSON.parse(localStorage.getItem('userService'));
      this.isLoggedInSubscription.next(this.model);
    }
  }

  /**
   * Resets/initializes user service model.
   */
  public resetUser(): void {
    this.model = new AppUser();
    this.isLoggedInSubscription.next(this.model);
    localStorage.setItem('userService', JSON.stringify(this.model));
    console.log('reset user >>', localStorage.getItem('userService'));
  }

}
