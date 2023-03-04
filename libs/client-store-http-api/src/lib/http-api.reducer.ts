import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { httpApiActions } from './http-api.actions';
import { httpApiReducerConfig } from './http-api.interface';

@Injectable({
  providedIn: 'root',
})
export class AppHttpApiReducer {
  public createReducer() {
    return createReducer(
      httpApiReducerConfig.initialState,
      on(httpApiActions.pingSuccess, (state, { payload }) => ({ ping: payload.message })),
    );
  }
}

export const httpApiReducerProvider: Provider = {
  provide: httpApiReducerConfig.token,
  deps: [AppHttpApiReducer],
  useFactory: (reducer: AppHttpApiReducer) => reducer.createReducer(),
};
