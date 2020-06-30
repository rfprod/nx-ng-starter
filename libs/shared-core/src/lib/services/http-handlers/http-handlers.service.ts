// TODO: remove this overrides
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpProgressService } from '@nx-ng-starter/shared-store/state/http-progress/http-progress.service';
import { UserService } from '@nx-ng-starter/shared-store/state/user/user.service';
import { EHTTP_STATUS, WINDOW } from '@nx-ng-starter/shared-util';
import { HttpLink, HttpLinkHandler } from 'apollo-angular-link-http';
import { ApolloLink, ExecutionResult, split } from 'apollo-link';
import { ErrorResponse, onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { GraphQLError } from 'graphql';
import memo from 'memo-decorator';
import { MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, take, tap, timeout } from 'rxjs/operators';

import { APP_ENV, AppWebEnvironment } from '../../interfaces';
import { AppToasterService } from '../toaster/toaster.service';

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

  /**
   * Current user token value.
   */
  public userToken = '';

  /**
   * User token getter.
   */
  public readonly userToken$: Observable<string> = this.user.output.token$.pipe(
    tap((token: string) => {
      this.userToken = token;
    }),
  );

  constructor(
    public readonly user: UserService,
    public readonly toaster: AppToasterService,
    public readonly httpLink: HttpLink,
    public readonly httpProgress: HttpProgressService,
    public readonly translate: TranslateService,
    @Inject(WINDOW) public readonly win: Window,
    @Inject(APP_ENV) public readonly env: AppWebEnvironment,
  ) {
    void this.userToken$.subscribe();
  }

  /**
   * Resolves if app is running on localhost.
   */
  public isLocalhost(): boolean {
    return this.win.location.origin.includes('localhost');
  }

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
  public getGraphQLHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Token ${this.userToken}`,
    });
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
   * Pipes request with object response.
   * @param observable request observable
   * @param listenX number of responses to catch
   */
  public pipeHttpResponse<T>(observable: Observable<T>, listenX = 1): Observable<T> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress<T>(true),
      take(listenX),
      catchError(err => this.handleError(err)),
    );
  }

  /**
   * Pipes graphQL request response.
   * @param observable request observable
   * @param listenX number of responses to catch
   * @param withprogress should request start progress
   */
  public pipeGraphQLRequest<T>(
    observable: Observable<T>,
    listenX = 1,
    withprogress = true,
  ): Observable<T> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress<T>(withprogress),
      take(listenX),
      this.tapError<T>(),
      catchError(err => this.handleGraphQLError(err)),
    );
  }

  private getGraphqlNetworkLink(httpLinkHandler: HttpLinkHandler, uri: string) {
    return split(
      ({ query }) => {
        const { name } = getMainDefinition(query);
        return !Boolean(name);
      },
      httpLinkHandler,
      createUploadLink({
        uri,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { Authorization: `Token ${this.userToken}` },
      }),
    );
  }

  private getErroLinkHandler(errorLinkHandler?: ApolloLink) {
    const linkHandler = Boolean(errorLinkHandler)
      ? errorLinkHandler
      : onError((error: ErrorResponse) => {
          let resultMessage = '';
          /**
           * Error code in uppercase, e.g. ACCESS_FORBIDDEN.
           * Should be used as a translate service dictionary key
           * to retrieve a localized substring for UI display.
           * Only last error code is translated and displayed in UI.
           */
          let errorCode: string = null;
          let errorCodeUITranslation: string = null;

          const { graphQLErrors, networkError } = error;

          if (Boolean(graphQLErrors)) {
            // eslint-disable-next-line no-console
            console.error('Apollo linkHandler [GraphQL error]: ', graphQLErrors);
            graphQLErrors.map(({ message, extensions }) => {
              resultMessage += `[GraphQL]: ${message}`;
              errorCode = extensions?.code;
            });
          }

          if (Boolean(networkError)) {
            // eslint-disable-next-line no-console
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
                errorCode = extensions.code;
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
  public createApolloLinkFor(errorLinkHandler?: ApolloLink): ApolloLink {
    const uri = this.graphQlEndpoint();
    const httpLinkHandler = this.httpLink.create({ uri });

    const networkLink = this.getGraphqlNetworkLink(httpLinkHandler, uri);

    const linkHandler: ApolloLink = this.getErroLinkHandler(errorLinkHandler);

    return linkHandler.concat(networkLink);
  }

  /**
   * Extracts GraphQL data.
   * Returns data only, excluding meta information located in response object root.
   * @param res Execution result
   */
  public extractGraphQLData(res: ExecutionResult): { [key: string]: unknown } {
    if (Boolean(res.errors)) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw res.errors;
    }
    return res.data ?? res;
  }

  /**
   * Extracts HttpResponse.
   * @param res Http response
   */
  public extractHttpResponse<T>(res: HttpResponse<T>): T {
    return res.body;
  }

  /**
   * Check error status, and reset token if status is 401.
   * Note on errors:
   * 401 - unauthorized token expired
   * @param status error status
   */
  public checkErrorStatusAndRedirect(status: EHTTP_STATUS): void {
    if (status === EHTTP_STATUS.UNAUTHORIZED) {
      this.user.handlers.setState({ token: '' });
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
   * Taps progress.
   * @param withProgress indicates whether progress should be shown
   */
  public tapProgress<T>(widhProgress: boolean): MonoTypeOperatorFunction<T> {
    let handler: () => MonoTypeOperatorFunction<T> = () => null;
    if (widhProgress) {
      handler = this.httpProgress.handlers.mainView.tapStopperObservable;
    }
    return tap(handler, handler, handler);
  }

  /**
   * Taps errors.
   */
  public tapError<T>(): MonoTypeOperatorFunction<T> {
    return tap(
      (): void => null,
      (error: { networkError: HttpErrorResponse }) => {
        const unauthorized: boolean =
          Boolean(error.networkError) && error.networkError.status === EHTTP_STATUS.BAD_REQUEST;
        if (unauthorized) {
          this.checkErrorStatusAndRedirect(EHTTP_STATUS.UNAUTHORIZED);
        }
      },
    );
  }
}
