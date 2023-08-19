import { actionType } from '@app/client-util-ngrx';
import { createAction } from '@ngrx/store';

import { themeReducerConfig } from './theme.interface';

export const themeAction = {
  enableDarkTheme: createAction(actionType(themeReducerConfig.featureName, 'enable dark theme')),
  disableDarkTheme: createAction(actionType(themeReducerConfig.featureName, 'disable dark theme')),
  toggleDarkTheme: createAction(actionType(themeReducerConfig.featureName, 'toggle theme')),
};
