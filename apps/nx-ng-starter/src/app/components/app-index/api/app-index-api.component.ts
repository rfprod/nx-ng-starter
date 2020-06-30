import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { APP_ENV, MarkdownService, WebEnvironment } from '@nx-ng-starter/shared-core/data-access';
import { HttpApiService } from '@nx-ng-starter/shared-store/state';

/**
 * Application index api component.
 */
@Component({
  selector: 'app-index-api',
  templateUrl: './app-index-api.component.html',
  styleUrls: ['./app-index-api.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexApiComponent {
  public readonly ping$ = this.httpApi.output.ping$;

  constructor(
    private readonly markdown: MarkdownService,
    private readonly httpApi: HttpApiService,
    @Inject(APP_ENV) private readonly env: WebEnvironment,
  ) {}

  /**
   * Returns sample processed markdown text.
   */
  public getMarkedInstructions(): string {
    const apiInstructions = `# API endpoints:\n
    - ${this.env.api}/ping
    - ${this.env.api}/signup
    - ${this.env.api}/login
    - ${this.env.api}/logout
    - ${this.env.api}/graphql
    - ${this.env.api}/grpc
    - ${this.env.api}/grpc/:id`;
    return this.markdown.process(apiInstructions);
  }
}
