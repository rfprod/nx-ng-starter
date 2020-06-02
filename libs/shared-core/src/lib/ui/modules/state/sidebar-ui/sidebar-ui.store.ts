import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-core/util';

import { ISiedbarUiStateModel, SidebarUiPayload } from './sidebar-ui.interface';

const createAction = actionPayloadConstructor('SidebarUI');
const SetSidebarUiState = createAction<SidebarUiPayload>('Set Sidebar UI state');

const sidebarUiActions = {
  SetSidebarUiState,
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
class SidebarUiState {
  @Selector()
  public static getSidebarUi(state: ISiedbarUiStateModel) {
    return state;
  }

  @Selector()
  public static getSidebarOpened(state: ISiedbarUiStateModel) {
    return state.sidebarOpened;
  }

  @Action(SetSidebarUiState)
  public setSidebarUiState(ctx: StateContext<ISiedbarUiStateModel>, { payload }: SidebarUiPayload) {
    return ctx.patchState(payload);
  }
}

export { SidebarUiState, sidebarUiActions };
