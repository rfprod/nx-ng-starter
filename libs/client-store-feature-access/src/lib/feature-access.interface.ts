import { InjectionToken } from '@angular/core';
import { IReducerConfig } from '@app/client-util-ngrx';
import { ActionReducer } from '@ngrx/store';

export interface IFeatureAccessStateModel {
  environment: {
    production: boolean;
  };
  featureFlags: Record<string, boolean | undefined>;
}

export interface IFeatureAccessState {
  featureAccess: IFeatureAccessStateModel;
}

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
