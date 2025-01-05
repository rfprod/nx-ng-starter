import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureAccessReducerConfig, type IFeatureAccessStateModel } from './feature-access.interface';

export const featureAccessAction = {
  initialize: createAction(actionType(featureAccessReducerConfig.featureName, 'init')),
  setEnvironment: createAction(
    actionType(featureAccessReducerConfig.featureName, 'set environment'),
    props<{ payload: IFeatureAccessStateModel['environment'] }>(),
  ),
  setFeatureFlags: createAction(
    actionType(featureAccessReducerConfig.featureName, 'setFlags'),
    props<{ payload: IFeatureAccessStateModel['featureFlags'] }>(),
  ),
};
