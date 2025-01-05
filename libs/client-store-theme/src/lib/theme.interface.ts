import { InjectionToken } from '@angular/core';
import type { IReducerConfig } from '@app/client-util-ngrx';
import type { ActionReducer } from '@ngrx/store';

/** Theme state model. */
export interface IThemeStateModel {
  darkThemeEnabled: boolean;
}

/** Theme state. */
export interface IThemeState {
  theme: IThemeStateModel;
}

/** Theme reducer configuration. */
export const themeReducerConfig: IReducerConfig<keyof IThemeState, IThemeStateModel> = {
  featureName: 'theme',
  token: new InjectionToken<ActionReducer<IThemeStateModel>>('theme reducer'),
  initialState: {
    darkThemeEnabled: false,
  },
};
