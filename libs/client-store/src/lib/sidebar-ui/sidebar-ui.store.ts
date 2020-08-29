import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import {
  ISiedbarUiState,
  SIDEBAR_STATE,
  sidebarUiInitialState,
  TSidebarUiPayload,
} from './sidebar-ui.interface';

const createAction = actionPayloadConstructor(SIDEBAR_STATE.getName());
const setState = createAction<TSidebarUiPayload>('set state');

export const sidebarUiActions = {
  setState,
};

@State<ISiedbarUiState>({
  name: SIDEBAR_STATE,
  defaults: {
    ...sidebarUiInitialState,
  },
})
@Injectable({
  providedIn: 'root',
})
export class AppSidebarUiState {
  @Selector()
  public static getSidebarUi(state: ISiedbarUiState) {
    return state;
  }

  @Selector()
  public static getSidebarOpened(state: ISiedbarUiState) {
    return state.sidebarOpened;
  }

  @Action(setState)
  public setState(ctx: StateContext<ISiedbarUiState>, { payload }: TSidebarUiPayload) {
    return ctx.patchState(payload);
  }
}
