import { createSelector } from '@ngrx/store';

import type { IFeatureAccessState, IFeatureAccessStateModel } from './feature-access.interface';

const selectFeature = (state: IFeatureAccessState) => state.featureAccess;

export const featureAccessSelector = {
  enable: createSelector(selectFeature, (state: IFeatureAccessStateModel) => !state.environment.production),
  enableFeature: (flag: string) =>
    createSelector(selectFeature, (state: IFeatureAccessStateModel) =>
      state.environment.production ? state.featureFlags[flag] ?? false : true,
    ),
};
