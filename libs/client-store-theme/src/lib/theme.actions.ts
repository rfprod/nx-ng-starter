import { createAction } from '@ngrx/store';

import { featureName } from './theme.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const enableDarkTheme = createAction(type('enable dark theme'));

const disableDarkTheme = createAction(type('disable dark theme'));

const toggleDarkTheme = createAction(type('toggle theme'));

export const themeActions = {
  enableDarkTheme,
  disableDarkTheme,
  toggleDarkTheme,
};
