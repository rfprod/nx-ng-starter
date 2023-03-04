import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { featureAccessActions } from './feature-access.actions';
import { featureAccessReducerConfig } from './feature-access.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessReducer {
  public createReducer() {
    return createReducer(
      featureAccessReducerConfig.initialState,
      on(featureAccessActions.setEnvironment, (state, { payload }) => ({ ...state, environment: payload })),
      on(featureAccessActions.setFeatureFlags, (state, { payload }) => ({ ...state, featureFlags: payload })),
    );
  }
}

export const featureAccessReducerProvider: Provider = {
  provide: featureAccessReducerConfig.token,
  deps: [AppFeatureAccessReducer],
  useFactory: (reducer: AppFeatureAccessReducer) => reducer.createReducer(),
};
