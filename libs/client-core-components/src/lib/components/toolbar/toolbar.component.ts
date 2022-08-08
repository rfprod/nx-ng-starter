import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { chatbotActions, IChatbotState } from '@app/client-store-chatbot';
import { ISidebarState, sidebarActions, sidebarSelectors } from '@app/client-store-sidebar';
import { anchorButton, IAnchorButton } from '@app/client-util';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  @Input() public version = 'N/A';

  @Input() public anchors: IAnchorButton[] = [
    anchorButton(
      'Report a bug',
      'bug_report',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=bug_report.md&title=',
    ),
    anchorButton(
      'Request a feature',
      'lightbulb',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=feature_request.md&title=',
    ),
    anchorButton(
      'Request maintenance',
      'engineering',
      'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=maintenance.md&title=',
    ),
  ];

  @Output() public readonly darkThemeEnabled = new EventEmitter<boolean>();

  public readonly sidebarOpened$ = this.store.select(sidebarSelectors.sidebarOpened);

  constructor(public readonly store: Store<IChatbotState & ISidebarState>) {}

  public toggleSidebar(): void {
    this.store.dispatch(sidebarActions.toggle());
  }

  public toggleChatbot(): void {
    this.store.dispatch(chatbotActions.toggle());
  }

  public toggleMaterialTheme(event: boolean): void {
    this.darkThemeEnabled.emit(event);
  }
}
