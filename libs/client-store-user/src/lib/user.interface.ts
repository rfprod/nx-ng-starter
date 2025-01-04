import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';

/** User state model. */
export interface IUserStateModel {
  admin: boolean;
  email: string;
  token: string;
}

/** User state. */
export interface IUserState {
  user: IUserStateModel;
}

/** User reducer configuration. */
export const userReducerConfig: IReducerConfig<keyof IUserState, IUserStateModel> = {
  featureName: 'user',
  token: new InjectionToken<ActionReducer<IUserStateModel>>('user reducer'),
  initialState: {
    admin: false,
    email: '',
    token: '',
  },
};
