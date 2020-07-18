import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-util';

import { ISiedbarUiStateModel, TSidebarUiPayload } from './sidebar-ui.interface';

const createAction = actionPayloadConstructor('SidebarUI');
const setAppSidebarUiState = createAction<TSidebarUiPayload>('Set Sidebar UI state');

const sidebarUiActions = {
  setAppSidebarUiState,
};

@State<ISiedbarUiStateModel>({
  name: 'sidebarUi',
  defaults: {
    sidebarOpened: false,
  },
})
@Injectable({
  providedIn: 'root',
})
class AppSidebarUiState {
  @Selector()
  public static getSidebarUi(state: ISiedbarUiStateModel) {
    return state;
  }

  @Selector()
  public static getSidebarOpened(state: ISiedbarUiStateModel) {
    return state.sidebarOpened;
  }

  @Action(setAppSidebarUiState)
  public setAppSidebarUiState(
    ctx: StateContext<ISiedbarUiStateModel>,
    { payload }: TSidebarUiPayload,
  ) {
    return ctx.patchState(payload);
  }
}

export { AppSidebarUiState, sidebarUiActions };
