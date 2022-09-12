import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName, IHttpProgressPayload, IShowToastPayload } from './http-progress.interface';

const start = createAction(actionType(featureName, 'start'), props<{ payload: IHttpProgressPayload }>());

const stop = createAction(actionType(featureName, 'stop'), props<{ payload: IHttpProgressPayload }>());

const displayToast = createAction(actionType(featureName, 'display toast'), props<{ payload: IShowToastPayload }>());

export const httpProgressActions = {
  start,
  stop,
  displayToast,
};
