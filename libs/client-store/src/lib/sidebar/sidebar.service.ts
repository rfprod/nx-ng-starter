import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { first, tap } from 'rxjs/operators';

import { AppSidebarState, sidebarUiActions } from './sidebar.store';

@Injectable({
  providedIn: 'root',
})
export class AppSidebarService {
  public readonly sidebarOpened$ = this.store.select(AppSidebarState.getSidebarOpened);

  constructor(private readonly store: Store) {}

  public open() {
    void this.store.dispatch(new Navigate([{ outlets: { sidebar: ['root'] } }]));
    void this.store.dispatch(new sidebarUiActions.setState({ sidebarOpened: true }));
  }

  public close() {
    void this.store.dispatch(new Navigate([{ outlets: { sidebar: [] } }]));
    void this.store.dispatch(new sidebarUiActions.setState({ sidebarOpened: false }));
  }

  public toggle() {
    void this.sidebarOpened$
      .pipe(
        first(),
        tap(opened => {
          opened ? this.close() : this.open();
        }),
      )
      .subscribe();
  }
}
