import { IActionPayload } from '@app/client-util';
import { StateToken } from '@ngxs/store';

export interface ISiedbarState {
  sidebarOpened: boolean;
}

export const sidebarUiInitialState: ISiedbarState = {
  sidebarOpened: false,
};

export type TSidebarPayload = IActionPayload<ISiedbarState>;

export const SIDEBAR_STATE_TOKEN = new StateToken<ISiedbarState>('sidebar');
