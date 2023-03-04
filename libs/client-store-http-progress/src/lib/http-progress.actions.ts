import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { httpProgressReducerConfig, IHttpProgressPayload, IShowToastPayload } from './http-progress.interface';

const start = createAction(actionType(httpProgressReducerConfig.featureName, 'start'), props<{ payload: IHttpProgressPayload }>());

const stop = createAction(actionType(httpProgressReducerConfig.featureName, 'stop'), props<{ payload: IHttpProgressPayload }>());

const displayToast = createAction(
  actionType(httpProgressReducerConfig.featureName, 'display toast'),
  props<{ payload: IShowToastPayload }>(),
);

export const httpProgressActions = {
  start,
  stop,
  displayToast,
};
