import { createSelector } from '@ngrx/store';

import type { IThemeState, IThemeStateModel } from './theme.interface';

const selectFeature = (state: IThemeState) => state.theme;

export const themeSelector = {
  darkThemeEnabled: createSelector(selectFeature, (state: IThemeStateModel) => state.darkThemeEnabled),
};
