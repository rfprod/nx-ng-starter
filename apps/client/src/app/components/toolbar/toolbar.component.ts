import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSidebarUiService } from '@nx-ng-starter/client-store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  public readonly sidebarOpened$ = this.sidebarUiService.sidebarOpened$;

  constructor(public readonly sidebarUiService: AppSidebarUiService) {}
}
