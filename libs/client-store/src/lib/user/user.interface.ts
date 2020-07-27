import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export class AppUserStateModel {
  public email = '';

  public admin = false;

  public token = '';

  constructor(input?: AppUserStateModel) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}

export interface IAppUserStatePayload {
  email?: string;
  admin?: boolean;
  token?: string;
}

export type TUserPayload = IActionPayload<IAppUserStatePayload>;

export interface IUserObservableOutput {
  model$: Observable<AppUserStateModel>;
  email$: Observable<string>;
  token$: Observable<string>;
  admin$: Observable<boolean>;
  isLoggedInSubscription$: Observable<boolean>;
}

export interface IUserHandlers {
  setState(payload: IAppUserStatePayload): void;
}
