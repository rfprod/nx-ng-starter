import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

import { diagnosticsActions } from './diagnostics.actions';
import { IDiagnosticsStateModel, TDiagnosticData } from './diagnostics.interface';
import { AppStaticDataService } from './services/static-data/static-data-api.service';
import { AppWebsocketApiService } from './services/websocket/websocket-api.service';

@Injectable({
  providedIn: 'root',
})
export class AppDiagnosticsEffects {
  public readonly connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diagnosticsActions.connect.type),
      mergeMap(() => this.wsApi.connect<TDiagnosticData[]>()),
      map(event => {
        const payload: Pick<IDiagnosticsStateModel, 'events'> = { events: [event] };
        return diagnosticsActions.connected({ payload });
      }),
    ),
  );

  public readonly connected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diagnosticsActions.connected),
      map(({ payload }) => {
        const event = payload.events[0];
        return event.event === 'users'
          ? diagnosticsActions.userDataSuccess({ payload: event.data.reduce((acc: number, item) => acc + <number>item.value, 0) })
          : diagnosticsActions.dynamicDataSuccess({ payload: event.data });
      }),
    ),
  );

  public readonly startEvents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(diagnosticsActions.startEvents.type),
        tap(() => {
          this.wsApi.startDiagEvents();
        }),
      ),
    { dispatch: false },
  );

  public readonly stopEvents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(diagnosticsActions.stopEvents.type),
        tap(() => {
          this.wsApi.stopDiagEvents();
        }),
      ),
    { dispatch: false },
  );

  public readonly staticData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diagnosticsActions.staticData.type),
      mergeMap(() => this.staticApi.staticData()),
      map(payload => diagnosticsActions.staticDataSuccess({ payload })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly wsApi: AppWebsocketApiService,
    private readonly staticApi: AppStaticDataService,
  ) {}
}
