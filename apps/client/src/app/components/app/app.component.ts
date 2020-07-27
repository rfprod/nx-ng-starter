import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { AppSidebarUiService } from '@nx-ng-starter/client-store/state';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@nx-ng-starter/client-util';

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
  @ViewChild('appSidebar') public appSidebar?: MatSidenav;

  /**
   * Indicates if sidebar is opened.
   */
  public readonly sidebarOpened$ = this.sidebarUiService.sidebarOpened$;

  public readonly appName = this.env.appName;

  constructor(
    private readonly sidebarUiService: AppSidebarUiService,
    private readonly title: Title,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
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
