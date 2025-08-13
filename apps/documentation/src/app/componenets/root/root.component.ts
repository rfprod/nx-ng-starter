import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterContentInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { map } from 'rxjs';

import { DOCUMENTATION_ENVIRONMENT } from '../../interfaces/environment.interface';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppDocRootComponent implements OnInit, AfterContentInit {
  private readonly destroyRef = inject(DestroyRef);

  private readonly title = inject(Title);

  private readonly meta = inject(Meta);

  private readonly bpObserver = inject(BreakpointObserver);

  private readonly sw = inject(AppServiceWorkerService);

  private readonly env = inject(DOCUMENTATION_ENVIRONMENT);

  public readonly version = this.env.meta.version;

  public readonly config$ = this.bpObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(state => {
        const sidenavOpen = !state.breakpoints[Breakpoints.XSmall] && !state.breakpoints[Breakpoints.Small];
        return { sidenavOpen };
      }),
    );

  /**
   * Lifecycle hook called on component initialization.
   * When called does the following:
   * - sets document title;
   * - sets document description;
   */
  public ngOnInit(): void {
    this.title.setTitle(this.env.appName);
    this.meta.updateTag({ description: this.env.description });
  }

  public ngAfterContentInit(): void {
    void this.sw.subscribeToUpdates$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
