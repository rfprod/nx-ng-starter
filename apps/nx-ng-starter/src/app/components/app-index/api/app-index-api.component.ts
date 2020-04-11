import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MarkdownService } from '@nx-ng-starter/shared-core/data-access';
import { WINDOW } from '@nx-ng-starter/shared-core/util';

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
  private readonly apiUrl: string = /localhost/.test(this.win.location.origin)
    ? 'http://localhost:8080'
    : this.win.location.origin;

  constructor(
    private readonly markdown: MarkdownService,
    @Inject(WINDOW) private readonly win: Window,
  ) {}

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedInstructions(): string {
    const apiInstructions = `# API endpoints:\n
    - ${this.apiUrl}/api/ping
    - ${this.apiUrl}/api/signup
    - ${this.apiUrl}/api/login
    - ${this.apiUrl}/api/logout
    - ${this.apiUrl}/graphql
    - ${this.apiUrl}/api/grpc
    - ${this.apiUrl}/api/grpc/:id`;
    return this.markdown.process(apiInstructions);
  }
}
