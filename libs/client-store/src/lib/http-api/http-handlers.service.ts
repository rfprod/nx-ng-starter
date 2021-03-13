import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApolloLink, split } from '@apollo/client/core';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import {
  HTTP_STATUS,
  IWebClientAppEnvironment,
  WEB_CLIENT_APP_ENV,
  WINDOW,
} from '@nx-ng-starter/client-util';
import { HttpLink, HttpLinkHandler } from 'apollo-angular/http';
import { createUploadLink } from 'apollo-upload-client';
import { ExecutionResult, GraphQLError } from 'graphql';
import memo from 'memo-decorator';
import { MonoTypeOperatorFunction, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, first, map, tap, timeout } from 'rxjs/operators';

import { AppHttpProgressService } from '../http-progress/http-progress.service';
import { httpProgressActions } from '../http-progress/http-progress.store';
import { AppToasterService } from '../http-progress/services/toaster/toaster.service';
import { AppUserState } from '../user';
import { userActions } from '../user/user.store';

/**
 * Http handers service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpHandlersService {
  /**
   * Default timeout interval for http-requests.
   */
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
   * Resolver graphQL base url, adds correct protocol.
   */
  public graphQlEndpoint(): string {
    const url = `${this.env.api}/graphql`;
    return url;
  }

  /**
   * Returns new http headers for GraphQL.
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
   */
  @memo()
  public getEndpoint(path: string): string {
    const p = /^\/.*$/.test(path) ? path : `/${path}`;
    return this.env.api + p;
  }

  /**
   * Pipes http response.
   * Attaches settings:
   * - timeout
   * - error handler
   * - progress indicator
   */
  public pipeHttpResponse<T>(observable: Observable<T>) {
    void this.store.dispatch(new httpProgressActions.startProgress({ mainView: true }));
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      catchError(err => this.handleError(err)),
      finalize(() => {
        void this.store.dispatch(new httpProgressActions.stopProgress({ mainView: true }));
      }),
    );
  }

  /**
   * Pipes graphQL request response.
   * Attaches settings:
   * - timeout
   * - error handler
   * - progress indicator
   */
  public pipeGraphQLRequest<T>(observable: Observable<T>, withprogress = true) {
    if (withprogress) {
      void this.store.dispatch(new httpProgressActions.startProgress({ mainView: true }));
    }
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapError<T>(),
      catchError(err => this.handleGraphQLError(err)),
      finalize(() => {
        if (withprogress) {
          void this.store.dispatch(new httpProgressActions.stopProgress({ mainView: true }));
        }
      }),
    );
  }

  private getGraphqlNetworkLink(httpLinkHandler: HttpLinkHandler, uri: string) {
    return this.userToken$.pipe(
      first(),
      map(token => {
        return split(
          ({ query }) => {
            const { name } = getMainDefinition(query);
            return !Boolean(name);
          },
          httpLinkHandler,
          (createUploadLink({
            uri,
            headers: { Authorization: `Token ${token}` },
          }) as unknown) as ApolloLink,
        );
      }),
    );
  }

  private getErroLinkHandler(errorLinkHandler?: ApolloLink) {
    const linkHandler =
      typeof errorLinkHandler !== 'undefined'
        ? errorLinkHandler
        : onError((error: ErrorResponse) => {
            let resultMessage = '';
            /**
             * Error code in uppercase, e.g. ACCESS_FORBIDDEN.
             * Should be used as a translate service dictionary key
             * to retrieve a localized substring for UI display.
             * Only last error code is translated and displayed in UI.
             */
            let errorCode = '';
            let errorCodeUITranslation = '';

            const { graphQLErrors, networkError } = error;

            if (typeof graphQLErrors !== 'undefined') {
              console.error('Apollo linkHandler [GraphQL error]: ', graphQLErrors);
              graphQLErrors.map(({ message, extensions }) => {
                resultMessage += `[GraphQL]: ${message}`;
                errorCode = extensions?.code;
              });
            }

            if (Boolean(networkError)) {
              console.error('Apollo linkHandler [Network error]: ', networkError);

              if (networkError instanceof HttpErrorResponse) {
                resultMessage += (networkError.error as { detail: string }).detail;
              } else {
                const errors: GraphQLError[] = ((networkError as unknown) as {
                  error: {
                    errors: GraphQLError[];
                  };
                }).error.errors;
                errors.map(({ message, extensions }) => {
                  resultMessage += `[Network]: ${message}`;
                  errorCode = extensions?.code;
                });
              }
            }

            if (errorCode) {
              errorCodeUITranslation = this.translate.instant(`request.error.${errorCode}`);
              if (!errorCodeUITranslation.includes(errorCode)) {
                resultMessage = errorCodeUITranslation;
              }
            }

            if (!resultMessage) {
              resultMessage = 'Graphql request error';
            }

            this.toaster.showToaster(resultMessage, 'error');
          });
    return linkHandler;
  }

  /**
   * Creates apollo link with error handler.
   * @param errorLinkHandler custom error handler
   */
  public createApolloLinkFor(errorLinkHandler?: ApolloLink) {
    const uri = this.graphQlEndpoint();
    const httpLinkHandler = this.httpLink.create({ uri });
    const linkHandler: ApolloLink = this.getErroLinkHandler(errorLinkHandler);
    const networkLinkObs = this.getGraphqlNetworkLink(httpLinkHandler, uri);
    return networkLinkObs.pipe(map(networkLink => linkHandler.concat(networkLink)));
  }

  /**
   * Extracts GraphQL data.
   * Returns data only, excluding meta information located in response object root.
   * @param res Execution result
   */
  public extractGraphQLData(res: ExecutionResult): Observable<{ [key: string]: unknown }> {
    if (Boolean(res.errors)) {
      return throwError(res.errors);
    }
    return of(res.data ?? res);
  }

  /**
   * Extracts HttpResponse.
   * @param res Http response
   */
  public extractHttpResponse<T>(res: HttpResponse<T>) {
    return res.body;
  }

  /**
   * Check error status, and reset token if status is 401.
   * Note on errors:
   * 401 - unauthorized token expired
   * @param status error status
   */
  public checkErrorStatusAndRedirect(status: HTTP_STATUS): void {
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      void this.store.dispatch(new userActions.setState({ token: '' })).subscribe();
    }
  }

  public getErrorMessage(error: HttpErrorResponse): string {
    const msg: string = error.message ? error.message : error.error;
    const errorMessage: string = msg
      ? msg
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    return errorMessage;
  }

  /**
   * Handles error.
   * @param error error object
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    this.toaster.showToaster(errorMessage, 'error');
    return throwError(errorMessage);
  }

  /**
   * Handles graphQL error response.
   * @param error error message
   */
  public handleGraphQLError(error: string): Observable<never> {
    return throwError(error);
  }

  /**
   * Taps errors.
   */
  public tapError<T>(): MonoTypeOperatorFunction<T> {
    return tap(
      (): void => void 0,
      (error: { networkError: HttpErrorResponse }) => {
        const unauthorized: boolean =
          Boolean(error.networkError) && error.networkError.status === HTTP_STATUS.BAD_REQUEST;
        if (unauthorized) {
          this.checkErrorStatusAndRedirect(HTTP_STATUS.UNAUTHORIZED);
        }
      },
    );
  }
}
