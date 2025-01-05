import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { httpProgressReducerConfig, type IHttpProgressPayload, type IShowToastPayload } from './http-progress.interface';

export const httpProgressAction = {
  start: createAction(actionType(httpProgressReducerConfig.featureName, 'start'), props<{ payload: IHttpProgressPayload }>()),
  stop: createAction(actionType(httpProgressReducerConfig.featureName, 'stop'), props<{ payload: IHttpProgressPayload }>()),
  displayToast: createAction(actionType(httpProgressReducerConfig.featureName, 'display toast'), props<{ payload: IShowToastPayload }>()),
};
