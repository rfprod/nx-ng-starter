import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppSidebarUiService, chatbotActions } from '@nx-ng-starter/client-store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  public readonly sidebarOpened$ = this.sidebarUiService.sidebarOpened$;

  constructor(
    private readonly store: Store,
    public readonly sidebarUiService: AppSidebarUiService,
  ) {}

  public toggleChatbot(): void {
    void this.store.dispatch(new chatbotActions.toggle());
  }
}
