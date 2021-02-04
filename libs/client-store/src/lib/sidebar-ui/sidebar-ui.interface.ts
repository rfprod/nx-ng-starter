import { StateToken } from '@ngxs/store';
import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export interface ISiedbarUiState {
  sidebarOpened: boolean;
}

export const sidebarUiInitialState: ISiedbarUiState = {
  sidebarOpened: false,
};

export const SIDEBAR_STATE_TOKEN = new StateToken<ISiedbarUiState>('sidebar');

export type TSidebarUiPayload = IActionPayload<ISiedbarUiState>;

export interface IAppSidebarUiService {
  sidebarOpened$: Observable<boolean>;
}
