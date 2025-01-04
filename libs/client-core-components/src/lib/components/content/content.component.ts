import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenavContent } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { ISidebarState, sidebarAction, sidebarSelector } from '@app/client-store-sidebar';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppContentComponent {
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('content') public readonly content?: MatSidenavContent;

  public readonly sidebarOpen$ = this.store.select(sidebarSelector.sidebarOpen);

  public readonly routerEvents$ = this.router.events.pipe(
    takeUntilDestroyed(this.destroyRef),
    tap(event => {
      if (event instanceof NavigationEnd && typeof this.content !== 'undefined') {
        this.content.scrollTo({ top: 0 });
      }
    }),
  );

  constructor(
    private readonly store: Store<ISidebarState>,
    private readonly router: Router,
  ) {
    void this.routerEvents$.subscribe();
  }

  public sidebarCloseHandler(): void {
    this.store.dispatch(sidebarAction.close({ payload: { navigate: true } }));
  }

  public sidebarOpenHandler(): void {
    this.store.dispatch(sidebarAction.open({ payload: { navigate: true } }));
  }
}
