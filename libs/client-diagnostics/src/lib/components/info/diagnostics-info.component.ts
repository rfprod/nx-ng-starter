import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AppMarkdownService } from '@app/client-services';
import { httpApiActions, httpApiSelectors, IHttpApiState } from '@app/client-store-http-api';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-diagnostics-info',
  templateUrl: './diagnostics-info.component.html',
  styleUrls: ['./diagnostics-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsInfoComponent {
  /**
   * Ping result.
   */
  public readonly ping$ = this.store.select(httpApiSelectors.ping);

  /**
   * Sample processed markdown.
   */
  public readonly markedInstructions$ = of(null).pipe(
    map(() => {
      const apiInstructions = `# API endpoints:\n
    - ${this.env.api}/auth
    - ${this.env.api}/signup
    - ${this.env.api}/login
    - ${this.env.api}/logout
    - ${this.env.api}/mailer
    - ${this.env.api}/mail
    - ${this.env.api}/grpc
    - ${this.env.api}/grpc/:id`;
      return this.markdown.process(apiInstructions);
    }),
  );

  constructor(
    private readonly markdown: AppMarkdownService,
    private readonly store: Store<IHttpApiState>,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {
    this.store.dispatch(httpApiActions.ping());
  }
}
