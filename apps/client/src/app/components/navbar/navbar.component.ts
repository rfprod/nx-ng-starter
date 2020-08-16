import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@nx-ng-starter/client-util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent {
  public readonly appName = this.env.appName;

  constructor(@Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment) {}
}
