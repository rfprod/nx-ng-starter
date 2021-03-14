import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppMarkdownService } from '@nx-ng-starter/client-services';
import { AppHttpApiState, httpApiActions } from '@nx-ng-starter/client-store';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@nx-ng-starter/client-util';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppInfoComponent {
  /**
   * Ping result.
   */
  public readonly ping$ = this.store.select(AppHttpApiState.allData).pipe(map(ping => ping.ping));

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
    private readonly store: Store,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {
    void this.store.dispatch(new httpApiActions.ping()).subscribe();
  }
}
