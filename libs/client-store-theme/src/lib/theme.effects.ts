import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { themeActions } from './theme.actions';
import { IThemeState } from './theme.interface';
import { themeSelectors } from './theme.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppThemeEffects {
  public readonly enableDarkTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(themeActions.enableDarkTheme.type),
        tap(() => {
          this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
        }),
      ),
    { dispatch: false },
  );

  public readonly disableDarkTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(themeActions.disableDarkTheme.type),
        tap(() => {
          this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
        }),
      ),
    { dispatch: false },
  );

  public readonly toggleDarkTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(themeActions.toggleDarkTheme.type),
      withLatestFrom(this.store.select(themeSelectors.darkThemeEnabled)),
      map(([action, darkThemeEnabled]) => (darkThemeEnabled ? themeActions.disableDarkTheme() : themeActions.enableDarkTheme())),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<IThemeState>,
    private readonly overlayContainer: OverlayContainer,
  ) {}
}
