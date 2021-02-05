import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/client-util';

import {
  ISiedbarUiState,
  SIDEBAR_STATE_TOKEN,
  sidebarUiInitialState,
  TSidebarPayload,
} from './sidebar.interface';

const createAction = actionPayloadConstructor(SIDEBAR_STATE_TOKEN.getName());
const setState = createAction<TSidebarPayload>('set state');

export const sidebarUiActions = {
  setState,
};

@State<ISiedbarUiState>({
  name: SIDEBAR_STATE_TOKEN,
  defaults: {
    ...sidebarUiInitialState,
  },
})
@Injectable()
export class AppSidebarState {
  @Selector()
  public static getSidebar(state: ISiedbarUiState) {
    return state;
  }

  @Selector()
  public static getSidebarOpened(state: ISiedbarUiState) {
    return state.sidebarOpened;
  }

  @Action(setState)
  public setState(ctx: StateContext<ISiedbarUiState>, { payload }: TSidebarPayload) {
    return ctx.patchState(payload);
  }
}
