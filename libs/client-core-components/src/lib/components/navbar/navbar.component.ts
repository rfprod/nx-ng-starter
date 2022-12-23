import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IRouterState, routerActions } from '@app/client-store-router';
import { sidebarActions } from '@app/client-store-sidebar';
import { IRouterButton, IWebClientAppEnvironment, routerButton, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent {
  @Input() public logoSrc: string | null = 'assets/svg/logo.svg';

  @Input() public buttons: IRouterButton[] = [
    routerButton(
      'Home',
      'home',
      () =>
        this.router.isActive('', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      [{ outlets: { primary: [''] } }],
    ),
    routerButton(
      'API info',
      'api',
      () =>
        this.router.isActive('info', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      [{ outlets: { primary: ['info'] } }],
    ),
    routerButton(
      'Chart examples',
      'show_chart',
      () =>
        this.router.isActive('charts', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      [{ outlets: { primary: ['charts'] } }],
    ),
    routerButton(
      'Chat',
      'chat',
      () =>
        this.router.isActive('chatbot', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      [{ outlets: { primary: ['chatbot'] } }],
    ),
    routerButton(
      'Dashboards',
      'dashboard',
      () =>
        this.router.isActive('dashboards', {
          matrixParams: 'ignored',
          queryParams: 'ignored',
          paths: 'exact',
          fragment: 'ignored',
        }),
      [{ outlets: { primary: ['dashboards'] } }],
    ),
  ];

  public readonly appName = this.env.appName;

  /**
   * This subscription is needed to trigger change detection on router events so that the nav buttons state updates.
   */
  public readonly routerEvents$ = this.router.events;

  constructor(
    private readonly store: Store<IRouterState>,
    private readonly router: Router,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {}

  public sidebarCloseHandler(): void {
    this.store.dispatch(sidebarActions.close({ payload: { navigate: false } }));
  }

  public navigateBack(): void {
    this.store.dispatch(routerActions.back());
  }

  public navigateForward(): void {
    this.store.dispatch(routerActions.forward());
  }
}
