import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName, IPingResponse } from './http-api.interface';

const ping = createAction(actionType(featureName, 'ping'));

const pingSuccess = createAction(actionType(featureName, 'ping success'), props<{ payload: IPingResponse }>());

export const httpApiActions = {
  ping,
  pingSuccess,
};
