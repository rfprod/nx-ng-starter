import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { httpApiAction } from './http-api.actions';
import { AppHttpApiService } from './services/http-api/http-api.service';

@Injectable({
  providedIn: 'root',
})
export class AppHttpApiEffects {
  public readonly ping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(httpApiAction.ping.type),
      mergeMap(() => this.api.ping()),
      map(payload => httpApiAction.pingSuccess({ payload })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly api: AppHttpApiService,
  ) {}
}
