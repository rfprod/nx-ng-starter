import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { chatbotActions } from '@app/client-store-chatbot';
import { AppSidebarState, sidebarActions } from '@app/client-store-sidebar';
import { IToolbarAnchor } from '@app/client-util';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  @Input() public anchors: IToolbarAnchor[] = [
    {
      href: 'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=bug_report.md&title=',
      icon: 'bug_report',
      title: 'Report a bug',
    },
    {
      href: 'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=feature_request.md&title=',
      icon: 'lightbulb',
      title: 'Request a feature',
    },
    {
      href: 'https://github.com/rfprod/nx-ng-starter/issues/new?assignees=&labels=&template=maintenance.md&title=',
      icon: 'engineering',
      title: 'Request maintenance',
    },
  ];

  @Output() public readonly darkThemeEnabled = new EventEmitter<boolean>();

  public readonly sidebarOpened$ = this.store.select(AppSidebarState.getState).pipe(map(state => state.sidebarOpened));

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
