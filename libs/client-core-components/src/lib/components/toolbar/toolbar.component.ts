import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { chatbotActions } from '@app/client-store-chatbot';
import { AppSidebarState, sidebarActions } from '@app/client-store-sidebar';
import { anchorButton, IAnchorButton } from '@app/client-util';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

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

  public readonly sidebarOpened$ = this.store.select(AppSidebarState.state).pipe(map(state => state.sidebarOpened));

  constructor(public readonly store: Store) {}

  public toggleSidebar(): void {
    void this.store.dispatch(new sidebarActions.toggleSidebar());
  }

  public toggleChatbot(): void {
    void this.store.dispatch(new chatbotActions.toggle());
  }

  public toggleMaterialTheme(event: boolean): void {
    this.darkThemeEnabled.emit(event);
  }
}
