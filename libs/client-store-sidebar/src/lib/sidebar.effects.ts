import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { sidebarAction } from './sidebar.actions';
import { ISidebarState } from './sidebar.interface';
import { sidebarSelector } from './sidebar.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppSidebarEffects {
  private readonly actions$ = inject(Actions);

  private readonly store = inject(Store<ISidebarState>);

  private readonly router = inject(Router);

  public readonly open$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sidebarAction.open),
        mergeMap(({ payload }) => (payload.navigate ? from(this.router.navigate([{ outlets: { sidebar: ['root'] } }])) : of(null))),
      ),
    { dispatch: false },
  );

  public readonly close$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(sidebarAction.close),
        mergeMap(({ payload }) => (payload.navigate ? from(this.router.navigate([{ outlets: { sidebar: [] } }])) : of(null))),
      ),
    { dispatch: false },
  );

  public readonly toggle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sidebarAction.toggle.type),
      withLatestFrom(this.store.select(sidebarSelector.sidebarOpen)),
      map(([action, sidebarOpen]) => {
        return sidebarOpen ? sidebarAction.open({ payload: { navigate: true } }) : sidebarAction.close({ payload: { navigate: true } });
      }),
    ),
  );
}
