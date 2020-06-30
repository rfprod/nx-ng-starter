import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppHttpHandlersService } from '@nx-ng-starter/shared-core/services';
import { Message } from '@nx-ng-starter/shared-util';
import { tap } from 'rxjs/operators';

import {
  IHttpApiHandlers,
  IHttpApiInterface,
  IHttpApiObservableOutput,
  IHttpApiStatePayload,
} from './http-api.interface';
import { httpApiActions, HttpApiState } from './http-api.store';

/**
 * Http API service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpApiService {
  public readonly output: IHttpApiObservableOutput = {
    all$: this.store.select(HttpApiState.allData),
    ping$: this.store.select(HttpApiState.ping),
  };

  public readonly handlers: IHttpApiHandlers = {
    ping: {
      cached: () => this.store.selectOnce(HttpApiState.ping),
      request: () => this.http.ping(),
    },
  };

  /**
   * Http methods which request data from server and save it to state.
   */
  private readonly http: IHttpApiInterface = {
    ping: () => {
      const endpoint = this.httpHandlers.getEndpoint('ping');
      const observable = this.httpClient.get(endpoint).pipe(
        tap((result: Message) => {
          const payload: IHttpApiStatePayload = {
            ping: result.message,
          };
          void this.store.dispatch(new httpApiActions.ping(payload));
        }),
      );
      return this.httpHandlers.pipeHttpResponse<Message>(observable);
    },
  };

  constructor(
    private readonly store: Store,
    private readonly httpClient: HttpClient,
    private readonly httpHandlers: AppHttpHandlersService,
  ) {
    void this.handlers.ping.request().subscribe();
  }
}

/**
 * Http API service factory constructor.
 */
export type TAppHttpApiServiceFactoryConstructor = (
  store: Store,
  httpClient: HttpClient,
  httpHandlers: AppHttpHandlersService,
) => AppHttpApiService;

/**
 * Http API service factory.
 */
export const httpApiServiceFactory: TAppHttpApiServiceFactoryConstructor = (
  store: Store,
  httpClient: HttpClient,
  httpHandlers: AppHttpHandlersService,
) => {
  return new AppHttpApiService(store, httpClient, httpHandlers);
};

/**
 * Http API service provider.
 */
export const httpApiServiceProvider: Provider = {
  provide: AppHttpApiService,
  useFactory: httpApiServiceFactory,
  deps: [Store, HttpClient, AppHttpHandlersService],
};
