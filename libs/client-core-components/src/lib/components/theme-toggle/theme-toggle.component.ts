import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemeToggleComponent {
  @Input() public darkThemeEnabled: boolean | null = false;

  @Output() public readonly themeToggled = new EventEmitter<boolean>();

  public toggleTheme() {
    if (this.darkThemeEnabled !== null) {
      this.themeToggled.emit(!this.darkThemeEnabled);
    }
  }
}
