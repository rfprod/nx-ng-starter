import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';
import { TIMEOUT } from '@nx-ng-starter/shared-core/util';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * Application index home component.
 */
@UntilDestroy()
@Component({
  selector: 'nx-ng-starter-app-index-home',
  templateUrl: './app-index-home.component.html',
  styleUrls: ['./app-index-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexHomeComponent implements OnDestroy {
  public readonly timer$ = timer(TIMEOUT.INSTANT, TIMEOUT.MEDIUM).pipe(
    untilDestroyed(this),
    map(num => `Until destoyed timer ${num}`),
  );

  /**
   * Constructor.
   * @param markdown markdown service
   */
  constructor(private readonly markdown: MarkdownService) {}

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedInstructions(): string {
    const sidenavInstruction =
      'Open **sidenav** by clicking **logo** or **icon** button in the left corner of the browser window, and select an item \n\n';
    const markdownInstructions =
      '# You can use Markdown \n\n via MarkdownService, just like in this example.';
    return this.markdown.process(`${sidenavInstruction} ${markdownInstructions}`);
  }

  public ngOnDestroy() {}
}
