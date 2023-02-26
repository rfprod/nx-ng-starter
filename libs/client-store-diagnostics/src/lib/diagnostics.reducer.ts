import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { diagnosticsActions } from './diagnostics.actions';
import { featureName, IDiagnosticsStateModel } from './diagnostics.interface';

@Injectable({
  providedIn: 'root',
})
export class AppDiagnosticsReducer {
  public static readonly initialState: IDiagnosticsStateModel = {
    users: 0,
    events: [],
    dynamicData: [],
    staticData: [],
  };

  public static readonly token = new InjectionToken<ActionReducer<IDiagnosticsStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppDiagnosticsReducer.token,
    deps: [AppDiagnosticsReducer],
    useFactory: (reducer: AppDiagnosticsReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppDiagnosticsReducer.initialState,
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
