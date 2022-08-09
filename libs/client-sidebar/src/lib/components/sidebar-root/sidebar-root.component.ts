import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { httpProgressSelectors, IHttpProgressState } from '@app/client-store-http-progress';
import { sidebarActions } from '@app/client-store-sidebar';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar-root',
  templateUrl: './sidebar-root.component.html',
  styleUrls: ['./sidebar-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarRootComponent {
  public readonly loading$ = this.store.select(httpProgressSelectors.sidebar).pipe(map(state => state.loading));

  constructor(private readonly store: Store<IHttpProgressState>, private readonly router: Router) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    this.store.dispatch(sidebarActions.close({ payload: { navigate: true } }));
  }

  /**
   * Closes the sidebar, and navigates to the info view.
   */
  public navigateToInfoPage(): void {
    this.sidebarCloseHandler();
    void this.router.navigate([{ outlets: { primary: 'info' } }]);
  }

  /**
   * Closes the sidebar, and navigates to the chart examples view.
   */
  public navigateToChartExamples(): void {
    this.sidebarCloseHandler();
    void this.router.navigate([{ outlets: { primary: 'charts' } }]);
  }
}
