import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import { TThemePayload } from './theme.interface';

const createAction = actionPayloadConstructor('UI');

const setState = createAction<TThemePayload>('set theme');

export const themeActions = {
  setState,
};
