import { actionType } from '@app/client-util-ngrx';
import { createAction } from '@ngrx/store';

import { featureName } from './theme.interface';

const enableDarkTheme = createAction('enable dark theme');

const disableDarkTheme = createAction(actionType(featureName, 'disable dark theme'));

const toggleDarkTheme = createAction(actionType(featureName, 'toggle theme'));

export const themeActions = {
  enableDarkTheme,
  disableDarkTheme,
  toggleDarkTheme,
};
