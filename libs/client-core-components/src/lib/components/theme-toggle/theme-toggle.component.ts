import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { IThemeState, themeActions, themeSelectors } from '@app/client-store-theme';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppThemeToggleComponent {
  @Output() public readonly themeToggled = new EventEmitter<boolean>();

  public readonly darkThemeEnabled$ = this.store.select(themeSelectors.darkThemeEnabled).pipe(
    tap(darkThemeEnabled => {
      this.themeToggled.emit(darkThemeEnabled);
    }),
  );

  constructor(public readonly store: Store<IThemeState>) {}

  public toggleMaterialTheme(): void {
    this.store.dispatch(themeActions.toggleDarkTheme());
  }
}
