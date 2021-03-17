import { StateToken } from '@ngxs/store';

export interface ISiedbarState {
  sidebarOpened: boolean;
}

export const sidebarUiInitialState: ISiedbarState = {
  sidebarOpened: false,
};

export const SIDEBAR_STATE_TOKEN = new StateToken<ISiedbarState>('sidebar');
