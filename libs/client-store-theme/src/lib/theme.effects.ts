import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { themeAction } from './theme.actions';
import { IThemeState } from './theme.interface';
import { themeSelector } from './theme.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppThemeEffects {
  public readonly enableDarkTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(themeAction.enableDarkTheme.type),
        tap(() => {
          this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
        }),
      ),
    { dispatch: false },
  );

  public readonly disableDarkTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(themeAction.disableDarkTheme.type),
        tap(() => {
          this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
        }),
      ),
    { dispatch: false },
  );

  public readonly toggleDarkTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(themeAction.toggleDarkTheme.type),
      withLatestFrom(this.store.select(themeSelector.darkThemeEnabled)),
      map(([action, darkThemeEnabled]) => (darkThemeEnabled ? themeAction.disableDarkTheme() : themeAction.enableDarkTheme())),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<IThemeState>,
    private readonly overlayContainer: OverlayContainer,
  ) {}
}
