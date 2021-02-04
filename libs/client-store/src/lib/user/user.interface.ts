import { StateToken } from '@ngxs/store';
import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export interface IUserState {
  email: string;
  admin: boolean;
  token: string;
}

export const userInitialState: IUserState = {
  email: '',
  admin: false,
  token: '',
};

export const USER_STATE_TOKEN = new StateToken<IUserState>('user');

export interface IUserStatePayload {
  email?: string;
  admin?: boolean;
  token?: string;
}

export type TUserPayload = IActionPayload<IUserStatePayload>;

export interface IUserObservableOutput {
  model$: Observable<IUserState>;
  email$: Observable<string>;
  token$: Observable<string>;
  admin$: Observable<boolean>;
  isLoggedInSubscription$: Observable<boolean>;
}

export interface IUserHandlers {
  setState(payload: IUserStatePayload): void;
}
