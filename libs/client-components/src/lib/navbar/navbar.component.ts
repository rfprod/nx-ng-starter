import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { sidebarActions } from '@app/client-store-sidebar';
import { IToolbarButton, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent {
  @Input() public logoSrc = 'assets/icons/icon-72x72.png';

  @Input() public buttons: IToolbarButton[] = [
    {
      routerLink: [{ outlets: { primary: [''], sidebar: [] } }],
      routeActive: () =>
        this.router.isActive('', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      icon: 'home',
      title: 'Home',
    },
    {
      routerLink: [{ outlets: { primary: ['info'], sidebar: [] } }],
      routeActive: () =>
        this.router.isActive('info', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      icon: 'api',
      title: 'API info',
    },
    {
      routerLink: [{ outlets: { primary: ['chatbot'], sidebar: [] } }],
      routeActive: () =>
        this.router.isActive('chatbot', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      icon: 'chat',
      title: 'Chat',
    },
  ];

  public readonly appName = this.env.appName;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {}

  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarActions.setState({ sidebarOpened: false }));
  }
}
