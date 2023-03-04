import { InjectionToken } from '@angular/core';
import { IReducerConfig } from '@app/client-util-ngrx';
import { ActionReducer } from '@ngrx/store';

export interface IThemeStateModel {
  darkThemeEnabled: boolean;
}

export interface IThemeState {
  theme: IThemeStateModel;
}

export const themeReducerConfig: IReducerConfig<keyof IThemeState, IThemeStateModel> = {
  featureName: 'theme',
  token: new InjectionToken<ActionReducer<IThemeStateModel>>('theme reducer'),
  initialState: {
    darkThemeEnabled: false,
  },
};
