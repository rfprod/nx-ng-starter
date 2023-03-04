import { actionType } from '@app/client-util-ngrx';
import { createAction } from '@ngrx/store';

import { themeReducerConfig } from './theme.interface';

const enableDarkTheme = createAction(actionType(themeReducerConfig.featureName, 'enable dark theme'));

const disableDarkTheme = createAction(actionType(themeReducerConfig.featureName, 'disable dark theme'));

const toggleDarkTheme = createAction(actionType(themeReducerConfig.featureName, 'toggle theme'));

export const themeActions = {
  enableDarkTheme,
  disableDarkTheme,
  toggleDarkTheme,
};
