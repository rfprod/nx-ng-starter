import { Injectable, Provider } from '@angular/core';
import { createReducer, on } from '@ngrx/store';

import { featureAccessAction } from './feature-access.actions';
import { featureAccessReducerConfig } from './feature-access.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessReducer {
  public createReducer() {
    return createReducer(
      featureAccessReducerConfig.initialState,
      on(featureAccessAction.setEnvironment, (state, { payload }) => ({ ...state, environment: payload })),
      on(featureAccessAction.setFeatureFlags, (state, { payload }) => ({ ...state, featureFlags: payload })),
    );
  }
}

export const featureAccessReducerProvider: Provider = {
  provide: featureAccessReducerConfig.token,
  deps: [AppFeatureAccessReducer],
  useFactory: (reducer: AppFeatureAccessReducer) => reducer.createReducer(),
};
