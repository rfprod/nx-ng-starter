import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { sidebarUiActions } from '@nx-ng-starter/client-store';

@Component({
  selector: 'app-sidebar-root',
  templateUrl: './sidebar-root.component.html',
  styleUrls: ['./sidebar-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarRootComponent {
  constructor(private readonly store: Store) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarUiActions.closeSidebar());
    void this.store.dispatch(new Navigate([{ outlets: { primary: 'info' } }]));
  }
}
