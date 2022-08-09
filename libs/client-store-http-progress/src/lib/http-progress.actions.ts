import { createAction, props } from '@ngrx/store';

import { featureName, IHttpProgressPayload, IShowToastPayload } from './http-progress.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const start = createAction(type('start'), props<{ payload: IHttpProgressPayload }>());

const stop = createAction(type('stop'), props<{ payload: IHttpProgressPayload }>());

const displayToast = createAction(type('display toast'), props<{ payload: IShowToastPayload }>());

export const httpProgressActions = {
  start,
  stop,
  displayToast,
};
