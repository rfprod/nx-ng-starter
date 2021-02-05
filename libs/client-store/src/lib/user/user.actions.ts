import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import { TUserPayload, USER_STATE_TOKEN } from './user.interface';

const createAction = actionPayloadConstructor(USER_STATE_TOKEN.getName());

export const setState = createAction<TUserPayload>('set state');
