import { StateToken } from '@ngxs/store';
import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export interface IThemeStateModel {
  darkThemeEnabled: boolean;
}

export type TThemePayload = IActionPayload<IThemeStateModel>;

export interface IAppThemeService {
  darkThemeEnabled$: Observable<boolean>;
}

export const THEME_STATE_TOKEN = new StateToken<IAppThemeService>('theme');
