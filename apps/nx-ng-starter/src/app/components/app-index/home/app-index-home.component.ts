import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppMarkdownService } from '@nx-ng-starter/shared-core/services';
import { ETIMEOUT } from '@nx-ng-starter/shared-util';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Application index home component.
 */
@UntilDestroy()
@Component({
  selector: 'app-index-home',
  templateUrl: './app-index-home.component.html',
  styleUrls: ['./app-index-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexHomeComponent {
  public readonly timer$ = timer(ETIMEOUT.INSTANT, ETIMEOUT.MEDIUM).pipe(
    map(num => `Until destoyed timer ${num}`),
    untilDestroyed(this),
  );

  constructor(private readonly markdown: AppMarkdownService) {}

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedInstructions(): string {
    const sidenavInstruction =
      'Open **sidenav** by clicking **logo** or **icon** button in the left corner of the browser window, and select an item \n\n';
    const markdownInstructions =
      '# You can use Markdown \n\n via AppMarkdownService, just like in this example.';
    return this.markdown.process(`${sidenavInstruction} ${markdownInstructions}`);
  }
}
