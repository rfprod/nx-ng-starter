import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureAccessReducerConfig, IFeatureAccessStateModel } from './feature-access.interface';

const initialize = createAction(actionType(featureAccessReducerConfig.featureName, 'init'));

const setEnvironment = createAction(
  actionType(featureAccessReducerConfig.featureName, 'set environment'),
  props<{ payload: IFeatureAccessStateModel['environment'] }>(),
);

const setFeatureFlags = createAction(
  actionType(featureAccessReducerConfig.featureName, 'setFlags'),
  props<{ payload: IFeatureAccessStateModel['featureFlags'] }>(),
);

export const featureAccessActions = {
  initialize,
  setEnvironment,
  setFeatureFlags,
};
