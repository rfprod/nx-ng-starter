import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';

import { untilDestroyed } from 'ngx-take-until-destroy';

/**
 * Application index component.
 */
@Component({
  selector: 'nx-ng-starter-app-index',
  templateUrl: './app-index.component.html',
  styleUrls: ['./app-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexComponent implements OnInit, OnDestroy {
  /**
   * Component title.
   */
  public title = 'Components library directory';

  /**
   * Demo state.
   */
  public demo: any = {
    off: true,
    customButton: false,
  };

  /**
   * Constructor.
   * @param markdown markdown service
   * @param route activated route
   */
  constructor(private readonly markdown: MarkdownService, private readonly route: ActivatedRoute) {}

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
      let selectedItem: string = queryParams.get('demo');
      if (!selectedItem) {
        selectedItem = 'off';
      }
      for (const key in this.demo) {
        if (this.demo[key]) {
          this.demo[key] = key === selectedItem ? true : false;
        }
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
    console.log(this.markdown.process(input));
    return this.markdown.process(input);
  }
}
