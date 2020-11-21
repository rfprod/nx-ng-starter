import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { IAppWebsocketStatePayload, IWebsocketservice } from './websocket.interface';
import { AppWebsocketState, websocketActions } from './websocket.store';
import { AppWebsocketApiService } from './websocket-api.service';

@Injectable({
  providedIn: 'root',
})
export class AppWebsocketService implements IWebsocketservice {
  public readonly events$ = this.store.select(AppWebsocketState.getEvents);

  public readonly users$ = this.store.select(AppWebsocketState.getUsers);

  public readonly state$ = this.store.select(AppWebsocketState.getState);

  constructor(private readonly store: Store, protected api: AppWebsocketApiService) {
    void this.api
      .connect()
      .pipe(
        concatMap(event => {
          const payload = {
            users: event.event === 'users' ? event.data : void 0,
            events: [event],
          };
          return this.setState(payload);
        }),
      )
      .subscribe();
  }

  public setState(payload: IAppWebsocketStatePayload): Observable<IAppWebsocketStatePayload> {
    return this.store.dispatch(new websocketActions.setState(payload));
  }

  public getData() {
    this.api.sendEvent('events');
  }
}
