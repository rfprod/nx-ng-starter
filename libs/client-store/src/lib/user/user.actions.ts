import { actionPayloadConstructor } from '@app/client-util';

import { TUserPayload, USER_STATE_TOKEN } from './user.interface';

const createAction = actionPayloadConstructor(USER_STATE_TOKEN.getName());

const setState = createAction<TUserPayload>('set state');

export const userActions = {
  setState,
};
