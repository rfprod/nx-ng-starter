import { createAction, props } from '@ngrx/store';

import { featureName, IWebsocketStateModel } from './websocket.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const connect = createAction(type('connect'));

const connected = createAction(type('connected'), props<{ payload: Partial<IWebsocketStateModel> }>());

const getEvents = createAction(type('get events'));

export const websocketActions = {
  connect,
  connected,
  getEvents,
};
