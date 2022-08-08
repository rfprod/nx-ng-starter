import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { httpApiActions } from './http-api.actions';
import { featureName, IHttpApiStateModel } from './http-api.interface';

@Injectable({
  providedIn: 'root',
})
export class AppHttpApiReducer {
  public static readonly initialState: IHttpApiStateModel = {
    ping: '',
  };

  public static readonly token = new InjectionToken<ActionReducer<IHttpApiStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppHttpApiReducer.token,
    deps: [AppHttpApiReducer],
    useFactory: (reducer: AppHttpApiReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppHttpApiReducer.initialState,
      on(httpApiActions.pingSuccess, (state, { payload }) => ({ ping: payload.message })),
    );
  }
}
