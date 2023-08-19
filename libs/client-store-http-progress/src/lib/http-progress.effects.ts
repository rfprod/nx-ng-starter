import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs/operators';

import { httpProgressAction } from './http-progress.actions';
import { IHttpProgressState } from './http-progress.interface';
import { httpProgressSelector } from './http-progress.selectors';
import { AppHttpProgressService } from './services/http-progress/http-progress.service';
import { AppToasterService } from './services/toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AppHttpProgressEffects {
  public readonly start$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(httpProgressAction.start.type),
        withLatestFrom(this.store.select(httpProgressSelector.mainView)),
        tap(([action, mainView]) => {
          if (mainView.loading) {
            this.service.globalProgressHandler.start();
          }
        }),
      ),
    { dispatch: false },
  );

  public readonly stop$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(httpProgressAction.stop.type),
        withLatestFrom(this.store.select(httpProgressSelector.mainView)),
        tap(([action, mainView]) => {
          if (!mainView.loading) {
            this.service.globalProgressHandler.stop();
          }
        }),
      ),
    { dispatch: false },
  );

  public readonly displayToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(httpProgressAction.displayToast.type),
        withLatestFrom(this.store.select(httpProgressSelector.toaster)),
        tap(([action, toaster]) => {
          this.toaster.showToaster(toaster.message, toaster.type, toaster.duration);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<IHttpProgressState>,
    private readonly toaster: AppToasterService,
    private readonly service: AppHttpProgressService,
  ) {}
}
