import { Observable } from 'rxjs';

import { IActionPayload } from '@nx-ng-starter/shared-core/util';

import { AppUser } from '@nx-ng-starter/shared-core/data-access';

export class UserStateModel implements AppUser {
  public email = '';
  public admin = false;
  public token = '';
  constructor(input?: UserStateModel) {
    if (input) {
      this.email = input.email;
      this.admin = input.admin;
      this.token = input.token;
    }
  }
}

export interface IUserStatePayload {
  email?: string;
  admin?: boolean;
  token?: string;
}

export type UserPayload = IActionPayload<IUserStatePayload>;

export interface IUserObservableOutput {
  model$: Observable<UserStateModel>;
  email$: Observable<string>;
  token$: Observable<string>;
  admin$: Observable<boolean>;
  isLoggedInSubscription$: Observable<boolean>;
}

export interface IUserHandlers {
  setState(payload: IUserStatePayload): void;
}
