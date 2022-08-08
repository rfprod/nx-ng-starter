import { createSelector } from '@ngrx/store';

import { IThemeState, IThemeStateModel } from './theme.interface';

const selectFeature = (state: IThemeState) => state.theme;

const darkThemeEnabled = createSelector(selectFeature, (state: IThemeStateModel) => state.darkThemeEnabled);

export const themeSelectors = {
  darkThemeEnabled,
};
