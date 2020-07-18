import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { AppSidebarUiState, sidebarUiActions } from './sidebar-ui.store';

@Injectable({
  providedIn: 'root',
})
export class AppSidebarUiService {
  public readonly sidebarOpened$ = this.store.select(AppSidebarUiState.getSidebarOpened);

  constructor(private readonly store: Store) {}

  public open() {
    return this.store.dispatch(new sidebarUiActions.setAppSidebarUiState({ sidebarOpened: true }));
  }

  public close() {
    return this.store.dispatch(new sidebarUiActions.setAppSidebarUiState({ sidebarOpened: false }));
  }
}
