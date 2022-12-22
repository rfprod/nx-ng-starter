import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName, IFeatureAccessStateModel } from './feature-access.interface';

const initialize = createAction(actionType(featureName, 'init'));

const setEnvironment = createAction(
  actionType(featureName, 'setEnvironment'),
  props<{ payload: IFeatureAccessStateModel['environment'] }>(),
);

const setFeatureFlags = createAction(actionType(featureName, 'setFlags'), props<{ payload: IFeatureAccessStateModel['featureFlags'] }>());

export const featureAccessActions = {
  initialize,
  setEnvironment,
  setFeatureFlags,
};
