import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';

/**
 * Application index api component.
 */
@Component({
  selector: 'nx-ng-starter-app-index-api',
  templateUrl: './app-index-api.component.html',
  styleUrls: ['./app-index-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexApiComponent {
  /**
   * Constructor.
   * @param markdown markdown service
   */
  constructor(private readonly markdown: MarkdownService) {}

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedIntro(): string {
    return this.processMarkdown(
      '# You can use Markdown \n\n via MarkdownService, just like in this example.',
    );
  }

  /**
   * Processes arbitrary text in markdown format.
   * @param input input string in markdown format.
   */
  private processMarkdown(input: string): string {
    return this.markdown.process(input);
  }
}
