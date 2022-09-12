import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName, IWebsocketStateModel } from './websocket.interface';

const connect = createAction(actionType(featureName, 'connect'));

const connected = createAction(actionType(featureName, 'connected'), props<{ payload: Partial<IWebsocketStateModel> }>());

const getEvents = createAction(actionType(featureName, 'get events'));

export const websocketActions = {
  connect,
  connected,
  getEvents,
};
