import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { httpApiAction } from './http-api.actions';
import { httpApiReducerConfig } from './http-api.interface';

@Injectable({
  providedIn: 'root',
})
export class AppHttpApiReducer {
  public createReducer() {
    return createReducer(
      httpApiReducerConfig.initialState,
      on(httpApiAction.pingSuccess, (state, { payload }) => ({ ping: payload.message })),
    );
  }
}

export const httpApiReducerProvider: Provider = {
  provide: httpApiReducerConfig.token,
  deps: [AppHttpApiReducer],
  useFactory: (reducer: AppHttpApiReducer) => reducer.createReducer(),
};
