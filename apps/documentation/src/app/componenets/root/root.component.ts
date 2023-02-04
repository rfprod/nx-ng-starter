import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterContentInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppServiceWorkerService } from '@app/client-service-worker';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';

import { DOCUMENTATION_ENVIRONMENT, IDocumentationEnvironment } from '../../interfaces/environment.interface';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocRootComponent implements OnInit, AfterContentInit {
  public readonly version = this.env.meta.version;

  public readonly config$ = this.bpObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(state => {
        const sidenavOpen = !state.breakpoints[Breakpoints.XSmall] && !state.breakpoints[Breakpoints.Small];
        return { sidenavOpen };
      }),
    );

  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    private readonly bpObserver: BreakpointObserver,
    private readonly sw: AppServiceWorkerService,
    @Inject(DOCUMENTATION_ENVIRONMENT) private readonly env: IDocumentationEnvironment,
  ) {}

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
    void this.sw.subscribeToUpdates$.pipe(untilDestroyed(this)).subscribe();
  }
}
