import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { AppSidebarState, sidebarActions } from '@app/client-store-sidebar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContentComponent {
  @ViewChild('content') public readonly content?: MatSidenavContent;

  public readonly sidebarOpened$ = this.store.select(AppSidebarState.getState).pipe(map(state => state.sidebarOpened));

  public readonly routerEvents$ = this.router.events.pipe(
    tap(event => {
      if (event instanceof NavigationEnd && typeof this.content !== 'undefined') {
        this.content.scrollTo({ top: 0 });
      }
    }),
    untilDestroyed(this),
  );

  constructor(private readonly store: Store, private readonly router: Router) {
    void this.routerEvents$.subscribe();
  }

  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarActions.closeSidebar());
  }

  public sidebarOpenHandler(): void {
    void this.store.dispatch(new sidebarActions.openSidebar());
  }
}
