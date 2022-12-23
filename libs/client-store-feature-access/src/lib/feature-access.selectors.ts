import { createSelector } from '@ngrx/store';

import { IFeatureAccessState, IFeatureAccessStateModel } from './feature-access.interface';

const selectFeature = (state: IFeatureAccessState) => state.featureAccess;

const enable = createSelector(selectFeature, (state: IFeatureAccessStateModel) => !state.environment.production);

const enableFeature = (flag: string) =>
  createSelector(selectFeature, (state: IFeatureAccessStateModel) =>
    state.environment.production ? state.featureFlags[flag] ?? false : true,
  );

export const featureAccessSelectors = {
  enable,
  enableFeature,
};
