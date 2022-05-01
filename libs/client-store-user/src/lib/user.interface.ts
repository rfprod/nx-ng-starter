import { IActionPayload } from '@app/client-util';
import { StateToken } from '@ngxs/store';
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

export type TUserPayload = IActionPayload<Partial<IUserState>>;

export interface IUserObservableOutput {
  model$: Observable<IUserState>;
  email$: Observable<string>;
  token$: Observable<string>;
  admin$: Observable<boolean>;
  isLoggedInSubscription$: Observable<boolean>;
}
