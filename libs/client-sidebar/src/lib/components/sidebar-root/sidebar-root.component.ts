import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppHttpProgressState, sidebarActions } from '@app/client-store';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar-root',
  templateUrl: './sidebar-root.component.html',
  styleUrls: ['./sidebar-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarRootComponent {
  public readonly loading$ = this.store.select(AppHttpProgressState.sidebarProgress).pipe(map(state => state.loading));

  constructor(private readonly store: Store) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarActions.closeSidebar());
  }

  /**
   * Closes sidebar, and navigate to info page.
   */
  public navigateToInfoPage(): void {
    this.sidebarCloseHandler();
    void this.store.dispatch(new Navigate([{ outlets: { primary: 'info' } }]));
  }
}
