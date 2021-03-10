import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class AppSidebarService {
  constructor(private readonly store: Store) {}

  public openSidebar() {
    void this.store.dispatch(new Navigate([{ outlets: { sidebar: ['root'] } }]));
  }

  public closeSidebar() {
    void this.store.dispatch(new Navigate([{ outlets: { sidebar: [] } }]));
  }
}
