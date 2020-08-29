import { Injectable } from '@angular/core';

import { IUserState } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  public restoreUser() {
    const userService = localStorage.getItem('userService');
    const user: IUserState =
      userService !== null && typeof userService !== 'undefined' ? JSON.parse(userService) : {};
    return user;
  }

  public saveUser(model: IUserState): void {
    localStorage.setItem('userService', JSON.stringify(model));
  }
}
