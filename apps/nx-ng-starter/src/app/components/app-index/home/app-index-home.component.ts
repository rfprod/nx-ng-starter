import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';

import { untilDestroyed } from 'ngx-take-until-destroy';

/**
 * Application index home component.
 */
@Component({
  selector: 'nx-ng-starter-app-index-home',
  templateUrl: './app-index-home.component.html',
  styleUrls: ['./app-index-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexHomeComponent implements OnInit, OnDestroy {
  /**
   * Constructor.
   * @param markdown markdown service
   * @param route activated route
   * @param router application router
   */
  constructor(
    private readonly markdown: MarkdownService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedIntro(): string {
    return this.processMarkdown(
      '# You can use Markdown \n\n via MarkdownService, just like in this example.',
    );
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.route.queryParamMap.pipe(untilDestroyed(this)).subscribe((queryParams: Params) => {
      const selectedItem: string = queryParams.get('item');
      if (!selectedItem) {
        this.router.navigate(['']);
      }
    });
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {}

  /**
   * Processes arbitrary text in markdown format.
   * @param input input string in markdown format.
   */
  private processMarkdown(input: string): string {
    return this.markdown.process(input);
  }
}
