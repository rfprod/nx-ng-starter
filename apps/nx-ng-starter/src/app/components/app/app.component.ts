import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { APP_ENV, AppWebEnvironment } from '@nx-ng-starter/shared-core/interfaces';
import { SidebarUiService } from '@nx-ng-starter/shared-store/state';

/**
 * Application root component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /**
   * Sidebar viewchild reference.
   */
  @ViewChild('appSidebar') public appSidebar: MatSidenav;

  /**
   * Indicates if sidebar is opened.
   */
  public readonly sidebarOpened$ = this.sidebarUiService.sidebarOpened$;

  public readonly appName = this.env.appName;

  constructor(
    private readonly sidebarUiService: SidebarUiService,
    private readonly title: Title,
    @Inject(APP_ENV) private readonly env: AppWebEnvironment,
  ) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    void this.sidebarUiService.close().subscribe();
    this.title.setTitle(this.env.appName);
  }

  public swiperightHandler(event: Event): void {
    void this.sidebarUiService.open().subscribe();
  }
}
