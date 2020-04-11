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
  public getMarkedInstructions(): string {
    const apiInstructions = `# API endpoints \n\n
    - http://localhost:8080/api/ping
    - http://localhost:8080/api/signup
    - http://localhost:8080/api/login
    - http://localhost:8080/api/logout
    - http://localhost:8080/graphql
    - http://localhost:8080/grpc
    - http://localhost:8080/grpc/:id`;
    return this.markdown.process(`${apiInstructions}`);
  }
}
