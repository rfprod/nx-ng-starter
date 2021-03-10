import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { closeSidebar, openSidebar } from './sidebar.actions';
import { ISiedbarUiState, SIDEBAR_STATE_TOKEN, sidebarUiInitialState } from './sidebar.interface';
import { AppSidebarService } from './sidebar.service';

export const sidebarUiActions = {
  openSidebar,
  closeSidebar,
};

@State<ISiedbarUiState>({
  name: SIDEBAR_STATE_TOKEN,
  defaults: {
    ...sidebarUiInitialState,
  },
})
@Injectable()
export class AppSidebarState {
  constructor(private readonly service: AppSidebarService) {}

  @Selector()
  public static getState(state: ISiedbarUiState) {
    return state;
  }

  @Action(openSidebar)
  public openSidebar(ctx: StateContext<ISiedbarUiState>) {
    const sidebarOpened = true;
    this.service.openSidebar();
    return ctx.patchState({ sidebarOpened });
  }

  @Action(closeSidebar)
  public closeSidebar(ctx: StateContext<ISiedbarUiState>) {
    const sidebarOpened = false;
    this.service.closeSidebar();
    return ctx.patchState({ sidebarOpened });
  }
}
