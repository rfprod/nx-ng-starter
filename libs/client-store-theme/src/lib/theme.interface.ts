import { IActionPayload } from '@app/client-util';
import { StateToken } from '@ngxs/store';

export interface IThemeStateModel {
  darkThemeEnabled: boolean;
}

export const themeInitialState: IThemeStateModel = {
  darkThemeEnabled: false,
};

export type TThemePayload = IActionPayload<IThemeStateModel>;

export const THEME_STATE_TOKEN = new StateToken<IThemeStateModel>('theme');
