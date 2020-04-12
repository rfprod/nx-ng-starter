import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

/**
 * Application root component.
 */
@Component({
  selector: 'nx-ng-starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * Component title.
   */
  public title = 'Nx Ng Starter';

  /**
   * Sidenav viewchild reference.
   */
  @ViewChild('appSidenav') public appSidenav: MatSidenav;
  /**
   * Indicates if sidenav is opened.
   */
  public sidenavOpened = false;
}
