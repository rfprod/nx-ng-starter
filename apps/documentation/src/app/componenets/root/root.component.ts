import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { map } from 'rxjs';

import { DOCUMENTATION_ENVIRONMENT, IDocumentationEnvironment } from '../../interfaces/environment.interface';

@Component({
  selector: 'app-documentation-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocRootComponent implements OnInit {
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
}
