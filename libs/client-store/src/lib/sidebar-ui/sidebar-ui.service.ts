import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { concatMap, first } from 'rxjs/operators';

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

  public toggle() {
    void this.sidebarOpened$
      .pipe(
        first(),
        concatMap(opened => {
          return this.store.dispatch(
            new sidebarUiActions.setAppSidebarUiState({ sidebarOpened: !opened }),
          );
        }),
      )
      .subscribe();
  }
}
