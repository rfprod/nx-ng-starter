import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { diagnosticsAction } from './diagnostics.actions';
import { diagnosticsReducerConfig } from './diagnostics.interface';

@Injectable({
  providedIn: 'root',
})
export class AppDiagnosticsReducer {
  public createReducer() {
    return createReducer(
      diagnosticsReducerConfig.initialState,
      on(diagnosticsAction.connected, (state, { payload }) => ({
        ...state,
        events: [...state.events, ...(payload.events ?? [])],
      })),
      on(diagnosticsAction.staticDataSuccess, (state, { payload }) => ({ ...state, staticData: payload })),
      on(diagnosticsAction.dynamicDataSuccess, (state, { payload }) => ({ ...state, dynamicData: payload })),
      on(diagnosticsAction.userDataSuccess, (state, { payload }) => ({ ...state, users: payload })),
    );
  }
}

export const diagnosticsReducerProvider: Provider = {
  provide: diagnosticsReducerConfig.token,
  deps: [AppDiagnosticsReducer],
  useFactory: (reducer: AppDiagnosticsReducer) => reducer.createReducer(),
};
