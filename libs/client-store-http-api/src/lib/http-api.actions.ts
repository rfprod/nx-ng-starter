import { createAction, props } from '@ngrx/store';

import { featureName, IPingResponse } from './http-api.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const ping = createAction(type('ping'));

const pingSuccess = createAction(type('ping success'), props<{ payload: IPingResponse }>());

export const httpApiActions = {
  ping,
  pingSuccess,
};
