import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppSidebarState, sidebarActions } from '@nx-ng-starter/client-store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContentComponent {
  public readonly sidebarOpened$ = this.store.select(AppSidebarState.getState).pipe(map(state => state.sidebarOpened));

  constructor(private readonly store: Store) {}

  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarActions.closeSidebar());
  }

  public sidebarOpenHandler(): void {
    void this.store.dispatch(new sidebarActions.openSidebar());
  }
}
