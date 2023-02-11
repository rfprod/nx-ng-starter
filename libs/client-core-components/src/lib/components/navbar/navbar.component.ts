import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IRouterButton, routerButton } from '@app/client-util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent {
  @Input() public appName: string | null = null;

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

  /**
   * This subscription is needed to trigger change detection on router events so that the nav buttons state updates.
   */
  public readonly routerEvents$ = this.router.events;

  @Output() public readonly navButtonClicked = new EventEmitter<undefined>();

  @Output() public readonly navigatedBack = new EventEmitter<undefined>();

  @Output() public readonly navigatedForward = new EventEmitter<undefined>();

  constructor(private readonly router: Router) {}

  public navButtonClick(): void {
    this.navButtonClicked.emit();
  }

  public navigateBack(): void {
    this.navigatedBack.emit();
  }

  public navigateForward(): void {
    this.navigatedForward.emit();
  }
}
