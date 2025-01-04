import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { httpApiReducerConfig, type IPingResponse } from './http-api.interface';

export const httpApiAction = {
  ping: createAction(actionType(httpApiReducerConfig.featureName, 'ping')),
  pingSuccess: createAction(actionType(httpApiReducerConfig.featureName, 'ping success'), props<{ payload: IPingResponse }>()),
};
