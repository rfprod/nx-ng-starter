import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { diagnosticsActions } from './diagnostics.actions';
import { diagnosticsReducerConfig } from './diagnostics.interface';

@Injectable({
  providedIn: 'root',
})
export class AppDiagnosticsReducer {
  public createReducer() {
    return createReducer(
      diagnosticsReducerConfig.initialState,
      on(diagnosticsActions.connected, (state, { payload }) => ({
        ...state,
        events: [...state.events, ...(payload.events ?? [])],
      })),
      on(diagnosticsActions.staticDataSuccess, (state, { payload }) => ({ ...state, staticData: payload })),
      on(diagnosticsActions.dynamicDataSuccess, (state, { payload }) => ({ ...state, dynamicData: payload })),
      on(diagnosticsActions.userDataSuccess, (state, { payload }) => ({ ...state, users: payload })),
    );
  }
}

export const diagnosticsReducerProvider: Provider = {
  provide: diagnosticsReducerConfig.token,
  deps: [AppDiagnosticsReducer],
  useFactory: (reducer: AppDiagnosticsReducer) => reducer.createReducer(),
};
