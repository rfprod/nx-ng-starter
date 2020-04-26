// TODO: remove this overrides
/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, ExecutionResult, split } from 'apollo-link';
import { ErrorResponse, onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import { GraphQLError } from 'graphql';
import memo from 'memo-decorator';
import { concat, MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, take, tap, timeout } from 'rxjs/operators';

import { HttpProgressService } from '../../ui/modules/state/http-progress/http-progress.service';
import { UserService } from '../../ui/modules/state/user/user.service';
import { WINDOW } from '../../util/general-purpose';
import { EHTTP_STATUS } from '../../util/http/http-statuses.interface';
import { APP_ENV, WebAppEnvironment } from '../interfaces';
import { ToasterService } from '../toaster/toaster.service';

/**
 * Http handers service.
 */
@Injectable({
  providedIn: 'root',
})
export class HttpHandlersService {
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
    public readonly toaster: ToasterService,
    public readonly httpLink: HttpLink,
    public readonly httpProgress: HttpProgressService,
    public readonly translate: TranslateService,
    @Inject(WINDOW) public readonly win: Window,
    @Inject(APP_ENV) public readonly env: WebAppEnvironment,
  ) {
    this.userToken$.subscribe();
  }

  /**
   * Resolves if app is running on localhost.
   */
  public isLocalhost(): boolean {
    return this.win.location.origin.indexOf('localhost') !== -1;
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
  public pipeRequestWithObjectResponse<T>(
    observable: Observable<T>,
    listenX = 1,
  ): Observable<T | string> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress<T>(true),
      take(listenX),
      catchError(err => this.handleError(err)),
    );
  }

  /**
   * Pipes request with array response.
   * @param observable request observable
   * @param listenX number of responses to catch
   */
  public pipeRequestWithArrayResponse<T>(
    observable: Observable<T>,
    listenX = 1,
  ): Observable<T | string> {
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
  ): Observable<T | string> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress<T>(withprogress),
      take(listenX),
      this.tapError<T>(),
      catchError(err => this.handleGraphQLError(err)),
    );
  }

  /**
   * Creates apollo link with error handler.
   * @param errorLinkHandler custom error handler
   */
  public createApolloLinkFor(errorLinkHandler?: ApolloLink): ApolloLink {
    let linkHandler: ApolloLink = errorLinkHandler;
    const uri = this.graphQlEndpoint();
    const httpLinkHandler = this.httpLink.create({ uri });

    if (!linkHandler) {
      linkHandler = onError((error: ErrorResponse) => {
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

        if (graphQLErrors) {
          console.error('Apollo linkHandler [GraphQL error]: ', graphQLErrors);
          graphQLErrors.map(({ message, extensions }) => {
            resultMessage += `[GraphQL]: ${message}`;
            errorCode = extensions && extensions.code;
          });
        }

        if (networkError) {
          console.error('Apollo linkHandler [Network error]: ', networkError);

          if (networkError instanceof HttpErrorResponse) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            resultMessage += networkError.error.detail;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const errors: GraphQLError[] = networkError['error'].errors;
            errors.map(({ message, extensions }) => {
              resultMessage += `[Network]: ${message}`;
              errorCode = extensions.code;
            });
          }
        }

        if (Boolean(errorCode)) {
          errorCodeUITranslation = this.translate.instant(`request.error.${errorCode}`);
          if (errorCodeUITranslation.indexOf(errorCode) === -1) {
            resultMessage = errorCodeUITranslation;
          }
        }

        if (!Boolean(resultMessage)) {
          resultMessage = 'Graphql request error';
        }

        this.toaster.showToaster(resultMessage, 'error');
      });
    }

    const networkLink = split(
      ({ query }) => {
        const { name } = getMainDefinition(query);
        return !name;
      },
      httpLinkHandler,
      createUploadLink({
        uri,
        headers: { Authorization: `Token ${this.userToken}` },
      }),
    );

    return linkHandler.concat(networkLink);
  }

  /**
   * Extracts GraphQL data.
   * Returns data only, excluding meta information located in response object root.
   * @param res Execution result
   */
  public extractGraphQLData(res: ExecutionResult): { [key: string]: unknown } {
    if (res.errors) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw res.errors;
    }
    return res.data ? res.data : res;
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

  /**
   * Parses error response in the following format
   * { _body: "{ errors: [ { code: 'c', detail: 'd' } ] }" } where _body is a string
   * or
   * { _body: "{ code: 'c', message: 'm', detail: { inn: ['Invalid inn'] } }" } where _body is a string.
   * @param error error object
   */
  public handleError(error: HttpErrorResponse): Observable<string> {
    let msg: string;
    // Parse error response, fallback: { status: '400', statusText: 'Bad request' }
    const errMsg: string = Boolean(msg)
      ? msg
      : Boolean(error.status)
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    return concat(throwError(errMsg));
  }

  /**
   * Handles graphQL error response.
   * @param error error message
   */
  public handleGraphQLError(error: string): Observable<string> {
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
          error.networkError && error.networkError.status === EHTTP_STATUS.BAD_REQUEST;
        if (unauthorized) {
          this.checkErrorStatusAndRedirect(EHTTP_STATUS.UNAUTHORIZED);
        }
      },
    );
  }
}
