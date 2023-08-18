import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { userAction } from './user.actions';
import { userReducerConfig } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AppUserReducer {
  public createReducer() {
    return createReducer(
      userReducerConfig.initialState,
      on(userAction.login, (state, { payload }) => ({ ...state, email: payload.email })),
      on(userAction.logout, state => ({ ...userReducerConfig.initialState, email: state.email })),
      on(userAction.signup, (state, { payload }) => ({ ...state, email: payload.email })),
    );
  }
}

export const userReducerProvider: Provider = {
  provide: userReducerConfig.token,
  deps: [AppUserReducer],
  useFactory: (reducer: AppUserReducer) => reducer.createReducer(),
};
