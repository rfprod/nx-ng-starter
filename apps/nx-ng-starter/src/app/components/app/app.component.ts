import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarUiService } from '@nx-ng-starter/shared-core/ui';

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
  public readonly sidenavOpened$ = this.sidebarUiService.sidebarOpened$;

  constructor(private readonly sidebarUiService: SidebarUiService) {}

  public sidebarCloseHandler(): void {
    this.sidebarUiService.close().subscribe();
  }
}
