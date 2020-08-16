import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSidebarUiService } from '@nx-ng-starter/client-store';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContentComponent {
  public readonly sidebarOpened$ = this.sidebarUiService.sidebarOpened$;

  constructor(private readonly sidebarUiService: AppSidebarUiService) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    void this.sidebarUiService.close().subscribe();
  }

  public swiperightHandler(event: Event): void {
    void this.sidebarUiService.open().subscribe();
  }
}
