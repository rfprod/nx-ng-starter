import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { sidebarActions } from './sidebar.actions';
import { ISiedbarState, SIDEBAR_STATE_TOKEN, sidebarUiInitialState } from './sidebar.interface';
import { AppSidebarService } from './sidebar.service';

@State<ISiedbarState>({
  name: SIDEBAR_STATE_TOKEN,
  defaults: {
    ...sidebarUiInitialState,
  },
})
@Injectable()
export class AppSidebarState {
  constructor(private readonly service: AppSidebarService) {}

  @Selector()
  public static getState(state: ISiedbarState) {
    return state;
  }

  @Action(sidebarActions.openSidebar)
  public openSidebar(ctx: StateContext<ISiedbarState>) {
    const sidebarOpened = true;
    this.service.openSidebar();
    return ctx.patchState({ sidebarOpened });
  }

  @Action(sidebarActions.closeSidebar)
  public closeSidebar(ctx: StateContext<ISiedbarState>) {
    const sidebarOpened = false;
    this.service.closeSidebar();
    return ctx.patchState({ sidebarOpened });
  }

  @Action(sidebarActions.toggleSidebar)
  public toggleSidebar(ctx: StateContext<ISiedbarState>) {
    const sidebarOpened = ctx.getState().sidebarOpened;
    const action = sidebarOpened ? new sidebarActions.closeSidebar() : new sidebarActions.openSidebar();
    return ctx.dispatch(action);
  }
}
