import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';

import { sidebarUiActions, SidebarUiState } from './sidebar-ui.store';

@Injectable({
  providedIn: 'root',
})
export class SidebarUiService {
  public readonly sidebarOpened$ = this.store.select(SidebarUiState.getSidebarOpened);

  constructor(private readonly store: Store) {}

  public open() {
    return this.store.dispatch(new sidebarUiActions.SetSidebarUiState({ sidebarOpened: true }));
  }

  public close() {
    return this.store.dispatch(new sidebarUiActions.SetSidebarUiState({ sidebarOpened: false }));
  }
}
