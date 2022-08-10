import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

import { AppWebsocketApiService } from './services/websocket-api.service';
import { websocketActions } from './websocket.actions';
import { IWebsocketStateModel } from './websocket.interface';

@Injectable({
  providedIn: 'root',
})
export class AppWebsocketEffects {
  public readonly connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(websocketActions.connect.type),
      mergeMap(() => this.api.connect<string | number>()),
      map(event => {
        const nextState: Partial<IWebsocketStateModel> =
          event.event === 'users'
            ? {
                users: <number>event.data,
                events: [event],
              }
            : {
                events: [event],
              };
        return websocketActions.connected({ payload: nextState });
      }),
    ),
  );

  public readonly getEvents$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(websocketActions.getEvents.type),
        tap(() => {
          this.api.sendEvent('events');
        }),
      ),
    { dispatch: false },
  );

  constructor(private readonly actions$: Actions, private readonly api: AppWebsocketApiService) {}
}
