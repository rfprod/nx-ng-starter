import { actionPayloadConstructor } from '@app/client-util';

import { HTTP_API_STATE_TOKEN } from './http-api.interface';

const createAction = actionPayloadConstructor(HTTP_API_STATE_TOKEN.getName());

const ping = createAction('ping');

export const httpApiActions = {
  ping,
};
