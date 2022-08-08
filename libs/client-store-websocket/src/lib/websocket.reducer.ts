import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { websocketActions } from './websocket.actions';
import { featureName, IWebsocketStateModel } from './websocket.interface';

@Injectable({
  providedIn: 'root',
})
export class AppWebsocketReducer {
  public static readonly initialState: IWebsocketStateModel = {
    users: 0,
    events: [],
  };

  public static readonly token = new InjectionToken<ActionReducer<IWebsocketStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppWebsocketReducer.token,
    deps: [AppWebsocketReducer],
    useFactory: (reducer: AppWebsocketReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppWebsocketReducer.initialState,
      on(websocketActions.connected, (state, { payload }) => ({
        users: typeof payload.users === 'undefined' ? state.users : payload.users,
        events: [...state.events, ...(payload.events ?? [])],
      })),
    );
  }
}
