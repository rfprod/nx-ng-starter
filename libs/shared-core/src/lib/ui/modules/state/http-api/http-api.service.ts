import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngxs/store';
import { Message } from '@nx-ng-starter/api-interface';
import { HttpHandlersService } from '@nx-ng-starter/shared-core/data-access';
import { tap } from 'rxjs/operators';
import { IHttpApiHandlers, IHttpApiInterface, IHttpApiObservableOutput, IHttpApiStatePayload } from './http-api.interface';
import { HttpApiState, httpApiActions } from './http-api.store';

/**
 * Http API service.
 */
@Injectable()
export class HttpApiService {

  public readonly output: IHttpApiObservableOutput = {
    all$: this.store.select(HttpApiState.AllData),
    ping$: this.store.select(HttpApiState.Ping),
  };

  public readonly handlers: IHttpApiHandlers = {
    ping: {
      cached: () => this.store.selectOnce(HttpApiState.Ping),
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
          this.store.dispatch(new httpApiActions.Ping(payload));
        })
      );
      return this.httpHandlers.pipeRequestWithObjectResponse<Message>(observable);
    },
  };

  constructor(
    private readonly store: Store,
    private readonly httpClient: HttpClient,
    private readonly httpHandlers: HttpHandlersService,
  ) {}
}

/**
 * Http API service factory constructor.
 */
export type HttpApiServiceFactoryConstructor = (
  store: Store,
  httpClient: HttpClient,
  httpHandlers: HttpHandlersService,
) => HttpApiService;

/**
 * Http API service factory.
 */
export const httpApiServiceFactory: HttpApiServiceFactoryConstructor = (
  store: Store,
  httpClient: HttpClient,
  httpHandlers: HttpHandlersService,
) => {
  return new HttpApiService(store, httpClient, httpHandlers);
};

/**
 * Http API service provider.
 */
export const httpApiServiceProvider: Provider = {
  provide: HttpApiService,
  useFactory: httpApiServiceFactory,
  deps: [Store, HttpClient, HttpHandlersService],
};
