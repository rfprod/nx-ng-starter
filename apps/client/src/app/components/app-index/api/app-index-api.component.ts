import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AppMarkdownService } from '@nx-ng-starter/client-services';
import { AppHttpApiService } from '@nx-ng-starter/client-store';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@nx-ng-starter/client-util';

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
    private readonly markdown: AppMarkdownService,
    private readonly httpApi: AppHttpApiService,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
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
