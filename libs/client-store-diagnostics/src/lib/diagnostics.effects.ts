import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

import { diagnosticsAction } from './diagnostics.actions';
import { IDiagnosticsStateModel, TDiagnosticData } from './diagnostics.interface';
import { AppStaticDataService } from './services/static-data/static-data-api.service';
import { AppWebsocketApiService } from './services/websocket/websocket-api.service';

@Injectable({
  providedIn: 'root',
})
export class AppDiagnosticsEffects {
  public readonly connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diagnosticsAction.connect.type),
      mergeMap(() => this.wsApi.connect<TDiagnosticData[]>()),
      map(event => {
        const payload: Pick<IDiagnosticsStateModel, 'events'> = { events: [event] };
        return diagnosticsAction.connected({ payload });
      }),
    ),
  );

  public readonly connected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diagnosticsAction.connected),
      map(({ payload }) => {
        const event = payload.events[0];
        return event.event === 'users'
          ? diagnosticsAction.userDataSuccess({ payload: event.data.reduce((acc: number, item) => acc + (item.value as number), 0) })
          : diagnosticsAction.dynamicDataSuccess({ payload: event.data });
      }),
    ),
  );

  public readonly startEvents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(diagnosticsAction.startEvents.type),
        tap(() => {
          this.wsApi.startDiagEvents();
        }),
      ),
    { dispatch: false },
  );

  public readonly stopEvents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(diagnosticsAction.stopEvents.type),
        tap(() => {
          this.wsApi.stopDiagEvents();
        }),
      ),
    { dispatch: false },
  );

  public readonly staticData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(diagnosticsAction.staticData.type),
      mergeMap(() => this.staticApi.staticData()),
      map(payload => diagnosticsAction.staticDataSuccess({ payload })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly wsApi: AppWebsocketApiService,
    private readonly staticApi: AppStaticDataService,
  ) {}
}
