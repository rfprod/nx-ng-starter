import { StateToken } from '@ngxs/store';

export interface ISiedbarUiState {
  sidebarOpened: boolean;
}

export const sidebarUiInitialState: ISiedbarUiState = {
  sidebarOpened: false,
};

export const SIDEBAR_STATE_TOKEN = new StateToken<ISiedbarUiState>('sidebar');
