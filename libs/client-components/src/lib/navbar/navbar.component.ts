import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import {
  IToolbarAnchor,
  IWebClientAppEnvironment,
  WEB_CLIENT_APP_ENV,
} from '@nx-ng-starter/client-util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent {
  @Input() public logoSrc = 'assets/icons/icon-72x72.png';

  @Input() public anchors: IToolbarAnchor[] = [
    {
      href: 'https://cli.angular.io/reference.pdf',
      icon: 'build',
      title: 'CLI Reference',
    },
    {
      href: 'https://material.angular.io/',
      icon: 'change_history',
      title: 'Angular Material',
    },
    {
      href: 'https://material.io/icons/',
      icon: 'info_outline',
      title: 'Material Icons',
    },
  ];

  public readonly appName = this.env.appName;

  constructor(@Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment) {}
}
