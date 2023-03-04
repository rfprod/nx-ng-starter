import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { httpApiReducerConfig, IPingResponse } from './http-api.interface';

const ping = createAction(actionType(httpApiReducerConfig.featureName, 'ping'));

const pingSuccess = createAction(actionType(httpApiReducerConfig.featureName, 'ping success'), props<{ payload: IPingResponse }>());

export const httpApiActions = {
  ping,
  pingSuccess,
};
