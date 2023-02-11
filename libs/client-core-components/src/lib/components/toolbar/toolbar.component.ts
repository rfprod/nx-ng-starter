import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { anchorButton, IAnchorButton } from '@app/client-util';

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

  @Input() public sidebarOpen: boolean | null = false;

  @Input() public chatbotOpen: boolean | null = false;

  @Input() public darkThemeEnabled: boolean | null = false;

  @Output() public readonly sidebarToggled = new EventEmitter<undefined>();

  @Output() public readonly chatbotToggled = new EventEmitter<boolean>();

  @Output() public readonly themeToggled = new EventEmitter<boolean>();

  public toggleSidebar(): void {
    this.sidebarToggled.emit();
  }

  public toggleChatbot(): void {
    if (this.chatbotOpen !== null) {
      this.chatbotToggled.emit(!this.chatbotOpen);
    }
  }

  public toggleTheme(): void {
    if (this.darkThemeEnabled !== null) {
      this.themeToggled.emit(!this.darkThemeEnabled);
    }
  }
}
