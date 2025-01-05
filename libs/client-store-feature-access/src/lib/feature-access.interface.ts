import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';

/** FeatureAccess state model. */
export interface IFeatureAccessStateModel {
  environment: {
    production: boolean;
  };
  featureFlags: Record<string, boolean | undefined>;
}

/** FeatureAccess state. */
export interface IFeatureAccessState {
  featureAccess: IFeatureAccessStateModel;
}

/** FeatureAccess reducer configuration. */
export const featureAccessReducerConfig: IReducerConfig<keyof IFeatureAccessState, IFeatureAccessStateModel> = {
  featureName: 'featureAccess',
  token: new InjectionToken<ActionReducer<IFeatureAccessStateModel>>('featureAccess reducer'),
  initialState: {
    environment: {
      production: false,
    },
    featureFlags: {},
  },
};
