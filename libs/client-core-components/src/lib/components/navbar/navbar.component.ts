import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { isActive, Router, RouterModule } from '@angular/router';
import { IRouterButton, routerButton, WINDOW } from '@app/client-util';

import { AppNavigatorComponent } from '../navigator/navigator.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, RouterModule, AppNavigatorComponent],
})
export class AppNavbarComponent {
  private readonly router = inject(Router);

  private readonly win = inject(WINDOW);

  @Input() public appName: string | null = null;

  @Input() public logoSrc: string | null = 'assets/svg/logo.svg';

  @Input() public buttons: IRouterButton[] = [
    routerButton(
      'Home',
      'home',
      isActive('', this.router, {
        matrixParams: 'ignored',
        queryParams: 'ignored',
        paths: 'exact',
        fragment: 'ignored',
      }),
      [{ outlets: { primary: [''] } }],
    ),
  ];

  /**
   * This subscription is needed to trigger change detection on router events so that the nav buttons state updates.
   */
  public readonly routerEvents$ = this.router.events;

  @Output() public readonly navButtonClicked = new EventEmitter<undefined>();

  @Output() public readonly navigatedBack = new EventEmitter<undefined>();

  @Output() public readonly navigatedForward = new EventEmitter<undefined>();

  public navButtonClick(): void {
    this.navButtonClicked.emit();
  }

  public navigateBack(): void {
    this.navigatedBack.emit();
  }

  public navigateForward(): void {
    this.navigatedForward.emit();
  }

  public openNavigator(): void {
    const event = new KeyboardEvent('keydown', {
      key: '~',
      code: 'Backquote',
      ctrlKey: true,
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });

    this.win.dispatchEvent(event);
  }
}
