import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { userAction } from './user.actions';

@Injectable({
  providedIn: 'root',
})
export class AppUserEffects {
  public readonly login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userAction.login.type),
        mergeMap(() => from(this.router.navigate([{ outlets: { primary: ['user'], sidebar: [''] } }]))),
      ),
    { dispatch: false },
  );

  public readonly logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userAction.logout.type),
        mergeMap(() => from(this.router.navigate([{ outlets: { primary: [''], sidebar: [''] } }]))),
      ),
    { dispatch: false },
  );

  public readonly signup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userAction.signup.type),
        mergeMap(() => from(this.router.navigate([{ outlets: { primary: ['login'], sidebar: [''] } }]))),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
  ) {}
}
