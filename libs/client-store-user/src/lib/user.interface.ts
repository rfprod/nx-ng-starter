import { InjectionToken } from '@angular/core';
import { IReducerConfig } from '@app/client-util-ngrx';
import { ActionReducer } from '@ngrx/store';

export interface IUserStateModel {
  admin: boolean;
  email: string;
  token: string;
}

export interface IUserState {
  user: IUserStateModel;
}

export const userReducerConfig: IReducerConfig<keyof IUserState, IUserStateModel> = {
  featureName: 'user',
  token: new InjectionToken<ActionReducer<IUserStateModel>>('user reducer'),
  initialState: {
    admin: false,
    email: '',
    token: '',
  },
};
