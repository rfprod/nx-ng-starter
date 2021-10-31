import { actionPayloadConstructor } from '@app/client-util';

import { HTTP_PROGRESS_STATE_TOKEN, THttpProgressPayload, TShowToastPayload } from './http-progress.interface';

const createAction = actionPayloadConstructor(HTTP_PROGRESS_STATE_TOKEN.toString());

const startProgress = createAction<THttpProgressPayload>('start');
const stopProgress = createAction<THttpProgressPayload>('stop');
const displayToast = createAction<TShowToastPayload>('display toast');

export const httpProgressActions = {
  startProgress,
  stopProgress,
  displayToast,
};
