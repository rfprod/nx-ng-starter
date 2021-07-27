import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { sidebarActions } from './sidebar.actions';
import { ISiedbarState, SIDEBAR_STATE_TOKEN, sidebarUiInitialState, TSidebarPayload } from './sidebar.interface';

@State<ISiedbarState>({
  name: SIDEBAR_STATE_TOKEN,
  defaults: {
    ...sidebarUiInitialState,
  },
})
@Injectable()
export class AppSidebarState {
  constructor(private readonly store: Store) {}

  @Selector()
  public static getState(state: ISiedbarState) {
    return state;
  }

  @Action(sidebarActions.openSidebar)
  public openSidebar(ctx: StateContext<ISiedbarState>) {
    void this.store.dispatch(new Navigate([{ outlets: { sidebar: ['root'] } }]));
    return ctx.patchState({ sidebarOpened: true });
  }

  @Action(sidebarActions.closeSidebar)
  public closeSidebar(ctx: StateContext<ISiedbarState>) {
    void this.store.dispatch(new Navigate([{ outlets: { sidebar: [] } }]));
    return ctx.patchState({ sidebarOpened: false });
  }

  @Action(sidebarActions.toggleSidebar)
  public toggleSidebar(ctx: StateContext<ISiedbarState>) {
    const sidebarOpened = ctx.getState().sidebarOpened;
    const action = sidebarOpened ? new sidebarActions.closeSidebar() : new sidebarActions.openSidebar();
    return ctx.dispatch(action);
  }

  @Action(sidebarActions.setState)
  public setState(ctx: StateContext<ISiedbarState>, { payload }: TSidebarPayload) {
    return ctx.patchState(payload);
  }
}
