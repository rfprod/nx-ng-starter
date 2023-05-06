import { DestroyRef, Inject, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';

import { IWebsocketConfig, IWebsocketRequestEvent, IWebsocketResponseEvent, WS_CONFIG } from '../../diagnostics.interface';

/**
 * Websocket API Service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppWebsocketApiService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly wsSubject: WebSocketSubject<IWebsocketRequestEvent> = new WebSocketSubject(this.wsConfig);

  constructor(@Inject(WS_CONFIG) private readonly wsConfig: IWebsocketConfig) {}

  public connect<T = unknown>() {
    return this.wsSubject.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(event => <IWebsocketResponseEvent<T>>event),
      catchError((error: Error) => {
        // eslint-disable-next-line no-console -- this is needed so that websocket erros are reported to console
        console.error('error', error);
        return of(<IWebsocketResponseEvent<T>>{ event: 'error.message' });
      }),
    );
  }

  public startDiagEvents() {
    this.wsSubject.next({ event: 'start-diag' });
  }

  public stopDiagEvents() {
    this.wsSubject.next({ event: 'stop-diag' });
  }
}
