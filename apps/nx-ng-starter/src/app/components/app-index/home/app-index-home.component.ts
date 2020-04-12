import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';
import { ETIMEOUT } from '@nx-ng-starter/shared-core/util';
import { BehaviorSubject, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

/**
 * Application index home component.
 */
@Component({
  selector: 'nx-ng-starter-app-index-home',
  templateUrl: './app-index-home.component.html',
  styleUrls: ['./app-index-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexHomeComponent implements OnDestroy {
  public readonly timer$ = timer(ETIMEOUT.INSTANT, ETIMEOUT.MEDIUM).pipe(
    map(num => `Until destoyed timer ${num}`),
    takeWhile(_ => !this.destroy$.value),
  );

  private readonly destroy$ = new BehaviorSubject<boolean>(false);

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

  public ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
