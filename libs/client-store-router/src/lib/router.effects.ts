import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { routerAction } from './router.actions';

@Injectable({
  providedIn: 'root',
})
export class AppRouterEffects {
  public readonly navigate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(routerAction.navigate),
        tap(({ payload: { path, query: queryParams, extras } }) => {
          void this.router.navigate(path, { queryParams, ...extras });
        }),
      ),
    { dispatch: false },
  );

  public readonly back$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(routerAction.back),
        tap(() => {
          this.location.historyGo(-1);
        }),
      ),
    { dispatch: false },
  );

  public readonly forward$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(routerAction.forward),
        tap(() => {
          this.location.historyGo(1);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly action$: Actions,
    private readonly router: Router,
    private readonly location: Location,
  ) {}
}
