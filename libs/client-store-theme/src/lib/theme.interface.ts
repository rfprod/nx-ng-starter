import { IActionPayload } from '@app/client-util';
import { StateToken } from '@ngxs/store';

export interface IThemeState {
  darkThemeEnabled: boolean;
}

export const themeInitialState: IThemeState = {
  darkThemeEnabled: false,
};

export type TThemePayload = IActionPayload<IThemeState>;

export const THEME_STATE_TOKEN = new StateToken<IThemeState>('theme');
