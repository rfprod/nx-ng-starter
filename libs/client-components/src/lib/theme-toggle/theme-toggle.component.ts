import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AppThemeState, themeActions } from '@app/client-store';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemeToggleComponent {
  @Output() public readonly themeToggled = new EventEmitter<boolean>();

  public readonly darkThemeEnabled$ = this.store.select(AppThemeState.darkThemeEnabled).pipe(
    tap(darkThemeEnabled => {
      this.themeToggled.emit(darkThemeEnabled);
    }),
  );

  constructor(public readonly store: Store) {}

  public toggleMaterialTheme(): void {
    void this.store.dispatch(new themeActions.toggleDarkTheme());
  }
}
