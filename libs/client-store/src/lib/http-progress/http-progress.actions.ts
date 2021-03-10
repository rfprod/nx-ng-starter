import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import {
  HTTP_PROGRESS_STATE_TOKEN,
  THttpProgressPayload,
  TShowToastPayload,
} from './http-progress.interface';

const createAction = actionPayloadConstructor(HTTP_PROGRESS_STATE_TOKEN.toString());

export const startProgress = createAction<THttpProgressPayload>('start');
export const stopProgress = createAction<THttpProgressPayload>('stop');
export const displayToast = createAction<TShowToastPayload>('display toast');
