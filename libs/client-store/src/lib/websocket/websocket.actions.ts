import { actionPayloadConstructor } from '@app/client-util';

import { TWebsocketPayload, WEBSOCKET_STATE_TOKEN } from './websocket.interface';

const createAction = actionPayloadConstructor(WEBSOCKET_STATE_TOKEN.getName());

const connect = createAction('connect');

const setState = createAction<TWebsocketPayload>('set state');

const getEvents = createAction('get events');

export const websocketActions = {
  setState,
  connect,
  getEvents,
};
