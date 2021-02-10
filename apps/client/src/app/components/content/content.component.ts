import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSidebarService } from '@nx-ng-starter/client-store';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContentComponent {
  public readonly sidebarOpened$ = this.sidebarService.sidebarOpened$;

  constructor(private readonly sidebarService: AppSidebarService) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    this.sidebarService.close();
  }

  public swiperightHandler(event: Event): void {
    this.sidebarService.open();
  }
}
