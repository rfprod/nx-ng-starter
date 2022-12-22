import { Injectable, InjectionToken, Provider } from '@angular/core';
import { ActionReducer, createReducer, on } from '@ngrx/store';

import { featureAccessActions } from './feature-access.actions';
import { featureName, IFeatureAccessStateModel } from './feature-access.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessReducer {
  public static readonly initialState: IFeatureAccessStateModel = {
    environment: {
      production: false,
    },
    featureFlags: {},
  };

  public static readonly token = new InjectionToken<ActionReducer<IFeatureAccessStateModel>>(`${featureName} reducer`);

  public static readonly provider: Provider = {
    provide: AppFeatureAccessReducer.token,
    deps: [AppFeatureAccessReducer],
    useFactory: (reducer: AppFeatureAccessReducer) => reducer.createReducer(),
  };

  public createReducer() {
    return createReducer(
      AppFeatureAccessReducer.initialState,
      on(featureAccessActions.setEnvironment, (state, { payload }) => ({ ...state, environment: payload })),
      on(featureAccessActions.setFeatureFlags, (state, { payload }) => ({ ...state, featureFlags: payload })),
    );
  }
}
