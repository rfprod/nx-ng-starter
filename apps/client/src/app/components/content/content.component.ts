import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppSidebarState, sidebarUiActions } from '@nx-ng-starter/client-store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContentComponent {
  public readonly sidebarOpened$ = this.store
    .select(AppSidebarState.getState)
    .pipe(map(state => state.sidebarOpened));

  constructor(private readonly store: Store) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarUiActions.closeSidebar());
  }

  public swiperightHandler(): void {
    void this.store.dispatch(new sidebarUiActions.openSidebar());
  }
}
