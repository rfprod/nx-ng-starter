import { actionPayloadConstructor } from '@app/client-util';

import { THEME_STATE_TOKEN, TThemePayload } from './theme.interface';

const createAction = actionPayloadConstructor(THEME_STATE_TOKEN.getName());

const enableDarkTheme = createAction('enable dark theme');

const disableDarkTheme = createAction('disable dark theme');

const toggleDarkTheme = createAction('toggle theme');

const setState = createAction<TThemePayload>('set theme');

export const themeActions = {
  enableDarkTheme,
  disableDarkTheme,
  toggleDarkTheme,
  setState,
};
