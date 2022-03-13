import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppHttpProgressState } from '@app/client-store-http-progress';
import { sidebarActions } from '@app/client-store-sidebar';
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
  public readonly loading$ = this.store.select(AppHttpProgressState.sidebar).pipe(map(state => state.loading));

  constructor(private readonly store: Store) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarActions.closeSidebar());
  }

  /**
   * Closes the sidebar, and navigates to the info view.
   */
  public navigateToInfoPage(): void {
    this.sidebarCloseHandler();
    void this.store.dispatch(new Navigate([{ outlets: { primary: 'info' } }]));
  }

  /**
   * Closes the sidebar, and navigates to the chart examples view.
   */
  public navigateToChartExamples(): void {
    this.sidebarCloseHandler();
    void this.store.dispatch(new Navigate([{ outlets: { primary: 'charts' } }]));
  }
}
