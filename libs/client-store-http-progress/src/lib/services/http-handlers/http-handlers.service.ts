import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApolloLink, ApolloQueryResult, FetchResult, split } from '@apollo/client/core';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { AppUserState, userActions } from '@app/client-store-user';
import { HTTP_STATUS, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV, WINDOW } from '@app/client-util';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { HttpLink, HttpLinkHandler } from 'apollo-angular/http';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLError } from 'graphql';
import memo from 'memo-decorator';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { catchError, finalize, first, map, tap, timeout } from 'rxjs/operators';

import { httpProgressActions } from '../../http-progress.actions';
import { AppHttpProgressService } from '../http-progress/http-progress.service';
import { AppToasterService } from '../toaster/toaster.service';

export type TGqlClient = 'graphql';

/**
 * Handlers to work with http requests.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpHandlersService {
  public readonly defaultHttpTimeout = 10000;

  public readonly userToken$: Observable<string> = this.store.select(AppUserState.token);

  constructor(
    public readonly store: Store,
    public readonly toaster: AppToasterService,
    public readonly httpLink: HttpLink,
    public readonly httpProgress: AppHttpProgressService,
    public readonly translate: TranslateService,
    @Inject(WINDOW) public readonly win: Window,
    @Inject(WEB_CLIENT_APP_ENV) public readonly env: IWebClientAppEnvironment,
  ) {}

  /**
   * Gets gql http headers.
   * @returns the gql headers observable
   */
  public getGraphQLHttpHeaders() {
    return this.userToken$.pipe(
      first(),
      map(token => {
        return new HttpHeaders({
          Authorization: `Token ${token}`,
        });
      }),
    );
  }

  /**
   * Returns API base url concatenated with provided endpoint path.
   * Adds preceding slash before endpoint path if it is missing.
   * @param path endpoint path
   * @returns an endpoint url
   */
  @memo()
  public getEndpoint(path: string): string {
    const endpoint = /^\/.*$/.test(path) ? path : `/${path}`;
    return `${this.env.api}${endpoint}`;
  }

  /**
   * Pipes an http response.
   * Attaches settings:
   * - timeout
   * - error handler
   * - progress indicator
   * @param observable input observable
   * @returns a piped observable
   */
  public pipeHttpResponse<T>(observable: Observable<T>) {
    void this.store.dispatch(new httpProgressActions.startProgress({ mainView: true }));
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapError<T>(),
      catchError(err => this.handleError(err)),
      finalize(() => {
        void this.store.dispatch(new httpProgressActions.stopProgress({ mainView: true }));
      }),
    );
  }

  /**
   * Pipes a gql response.
   * Attaches settings:
   * - timeout
   * - error handler
   * - progress indicator
   * @param observable input observable
   * @returns a piped observable
   */
  public pipeGqlResponse<T>(observable: Observable<ApolloQueryResult<T> | FetchResult<T>>) {
    void this.store.dispatch(new httpProgressActions.startProgress({ mainView: true }));
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapError(),
      map(result => result.data),
      catchError(err => this.handleGqlError(err)),
      finalize(() => {
        void this.store.dispatch(new httpProgressActions.stopProgress({ mainView: true }));
      }),
    );
  }

  /**
   * Gets the gql network link.
   * @param hander http link handler
   * @param uri universal resource indentifier
   * @returns gql link
   */
  private createGqlNetworkLink(hander: HttpLinkHandler, uri: string) {
    return this.userToken$.pipe(
      first(),
      map(token => {
        return split(
          ({ query }) => {
            const { name } = getMainDefinition(query);
            return !name;
          },
          hander,
          createUploadLink({
            uri,
            headers: { Authorization: `Token ${token}` },
          }) as unknown as ApolloLink,
        );
      }),
    );
  }

  /**
   * Gets the gql error link handler.
   * @returns apollo error link handler
   */
  private createGqlErrorLinkHandler() {
    return onError((error: ErrorResponse) => {
      const { graphQLErrors, networkError } = error;

      let errorMessage: string | undefined;

      graphQLErrors?.map(({ message, extensions }) => {
        console.error('Apollo linkHandler [GraphQL error]: ', message);
        const code = <string>extensions?.code;
        const result = `[GraphQL error ${code}]: ${message}`;
        errorMessage += result;
      });

      if (typeof networkError !== 'undefined') {
        console.error('Apollo linkHandler [Network error]: ', networkError);

        if (networkError instanceof HttpErrorResponse) {
          errorMessage += (networkError.error as { detail: string }).detail;
        } else {
          const errors: GraphQLError[] = (
            networkError as unknown as {
              error: {
                errors: GraphQLError[];
              };
            }
          ).error.errors;
          errors.map(({ message, extensions }) => {
            const code = <string>extensions?.code;
            const result = `[Network error ${code}]: ${message}`;
            errorMessage += result;
          });
        }
      }

      errorMessage = typeof errorMessage === 'undefined' ? 'Graphql request error' : errorMessage;

      this.toaster.showToaster(errorMessage, 'error');
    });
  }

  /**
   * Creates the gql link with an error handler.
   * @param name the client name
   * @returns apollo link observable
   */
  public createGqlLink(name: TGqlClient = 'graphql'): Observable<ApolloLink> {
    const uri = this.getEndpoint(name);
    const httpLinkHandler = this.httpLink.create({ uri });
    const linkHandler: ApolloLink = this.createGqlErrorLinkHandler();
    const networkLink$ = this.createGqlNetworkLink(httpLinkHandler, uri);
    return networkLink$.pipe(map(networkLink => linkHandler.concat(networkLink)));
  }

  /**
   * Check error status, and reset token if status is 401.
   * @param status error status
   */
  public checkErrorStatusAndRedirect(status: HTTP_STATUS): void {
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      void this.store.dispatch(new userActions.setState({ token: '' }));
    }
  }

  /**
   * Gets an error message from an http error response.
   * @param error http error response
   * @returns an error message
   */
  public getErrorMessage(error: HttpErrorResponse): string {
    const message: string | undefined = error.message ? error.message : error.error;
    const result: string =
      typeof message !== 'undefined' ? message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return result;
  }

  /**
   * Handles error.
   * @param error error object
   * @returns an empty observable
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    const message = this.getErrorMessage(error);
    this.toaster.showToaster(message, 'error');
    return of();
  }

  /**
   * Handles a graphQL error.
   * @param error error message
   * @returns an empty observable
   */
  public handleGqlError(error: string): Observable<never> {
    this.toaster.showToaster(error, 'error');
    return of();
  }

  /**
   * Taps errors.
   * @returns a monotype operator function
   */
  public tapError<T>(): MonoTypeOperatorFunction<T> {
    return tap({
      next: (): void => void 0,
      error: (error: HttpErrorResponse) => {
        this.checkErrorStatusAndRedirect(error.status);
      },
    });
  }
}
