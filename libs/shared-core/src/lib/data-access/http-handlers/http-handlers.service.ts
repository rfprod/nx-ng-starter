import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, ExecutionResult, split } from 'apollo-link';
import { ErrorResponse, onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import memo from 'memo-decorator';
import { MonoTypeOperatorFunction, Observable, concat, throwError } from 'rxjs';
import { catchError, take, tap, timeout } from 'rxjs/operators';
import { HttpProgressService } from '../../ui/modules/state/http-progress/http-progress.service';
import { UserService } from '../../ui/modules/state/user/user.service';
import { WINDOW } from '../../util/general-purpose';
import { EHTTP_STATUS } from '../../util/http/http-statuses.interface';
import { APP_ENV, AppEnvironment } from '../interfaces';
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
   * Rest server api domain.
   */
  private readonly api: string = this.window.location.origin;

  /**
   * Current user token value.
   */
  private userToken = '';

  /**
   * User token getter.
   */
  private readonly userToken$: Observable<string> = this.user.output.token$.pipe(
    tap((token: string) => {
      this.userToken = token;
    }),
  );

  /**
   * Constructor.
   * @param user user service
   * @param toaster app toaster service
   * @param httpLink apollo Http Link
   * @param httpProgress http progress service
   * @param translate ngx translate service
   * @param window window reference
   * @param appEnv app environment
   */
  constructor(
    private readonly user: UserService,
    private readonly toaster: ToasterService,
    private readonly httpLink: HttpLink,
    private readonly httpProgress: HttpProgressService,
    private readonly translate: TranslateService,
    @Inject(WINDOW) private readonly window: Window,
    @Inject(APP_ENV) private readonly appEnv: AppEnvironment,
  ) {
    this.api = this.appEnv.api || this.api;
    this.userToken$.subscribe();
  }

  /**
   * Resolves if app is running on localhost.
   */
  public isLocalhost(): boolean {
    return this.window.location.origin.indexOf('localhost') !== -1;
  }

  /**
   * Resolver graphQL base url, adds correct protocol.
   */
  public graphQlEndpoint(): string {
    const url = `${this.window.location.protocol}//${this.api}/graphql`;
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
    return this.api + p;
  }

  /**
   * Pipes request with object response.
   * @param observable request observable
   * @param listenX number of responses to catch
   */
  public pipeRequestWithObjectResponse<T>(
    observable: Observable<T>,
    listenX: number = 1,
  ): Observable<T> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress(true),
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
    listenX: number = 1,
  ): Observable<T> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress(true),
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
    listenX: number = 1,
    withprogress = true,
  ): Observable<T> {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress(withprogress),
      take(listenX),
      this.tapError(),
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
          console.log('Apollo linkHandler [GraphQL error]: ', graphQLErrors);
          graphQLErrors.map(({ message, extensions }) => {
            resultMessage += `[GraphQL]: ${message}`;
            errorCode = extensions && extensions.code;
          });
        }

        if (networkError) {
          console.log('Apollo linkHandler [Network error]: ', networkError);

          if (networkError instanceof HttpErrorResponse) {
            resultMessage += networkError.error.detail;
          } else {
            networkError['error'].errors.map(({ message, extensions }) => {
              resultMessage += `[Network]: ${message}`;
              errorCode = extensions.code;
            });
          }
        }

        if (errorCode) {
          errorCodeUITranslation = this.translate.instant(`request.error.${errorCode}`);
          if (errorCodeUITranslation.indexOf(errorCode) === -1) {
            resultMessage = errorCodeUITranslation;
          }
        }

        if (!resultMessage) {
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
  public extractGraphQLData(res: ExecutionResult): any {
    if (res.errors) {
      throw res.errors;
    }
    return res.data ? res.data : res;
  }

  /**
   * Extracts HttpResponse.
   * @param res Http response
   */
  public extractHttpResponse(res: HttpResponse<any>): any {
    return res.body;
  }

  /**
   * Check error status, and reset token if status is 401.
   * Note on errors:
   * 401 - unauthorized token expired
   * @param status error status
   */
  private checkErrorStatusAndRedirect(status: any): void {
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
  private handleError(error: any): Observable<any> {
    let msg: string;
    let errors: any;
    if (typeof error._body === 'string' && error._body !== 'null') {
      // Unwrap body
      error._body = JSON.parse(error._body);
      errors = error._body.errors
        ? error._body.errors
        : error._body.code && error._body.message
        ? error._body
        : null;
    }
    errors = !errors && error.errors ? error.errors : error.code && error.message ? error : errors;
    if (errors) {
      if (Array.isArray(errors)) {
        // Parse errors as array: { errors: [ { code: 'c', detail: 'd' } ] }
        if (errors.length) {
          const e = errors[0]; // Grab only first error
          msg = e.code && e.detail ? `${e.code} - ${e.detail}` : null;
        }
      } else {
        // Parse errors as object: { code: 'c', message: 'm', detail: { inn: ['Invalid inn'] } }
        let errDetail = '';
        if (errors.detail && typeof errors.detail === 'object') {
          // Unwrap nested structure for errors.detail first, it must be flat.
          for (const key in errors.detail) {
            if (errors.detail[key]) {
              if (!Array.isArray(errors.detail[key]) && typeof errors.detail[key] === 'object') {
                for (const subkey in errors.detail[key]) {
                  if (errors.detail[key][subkey]) {
                    errors.detail[subkey] = errors.detail[key][subkey];
                  }
                }
                delete errors.detail[key];
              }
            }
          }
          // Now parse it.
          for (const key in errors.detail) {
            if (errors.detail[key]) {
              errDetail += `${key} - ${errors.detail[key].join(', ')} `;
            }
          }
          errDetail = errDetail.trim();
        }
        msg = errDetail
          ? `${errors.code} - ${errors.message}: ${errDetail}`
          : `${errors.code} - ${errors.message}`;
      }
    }
    // Parse error response, fallback: { status: '400', statusText: 'Bad request' }
    const errMsg: string = msg
      ? msg
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    return concat(throwError(errMsg));
  }

  /**
   * Handles graphQL error response.
   * @param error error message
   */
  private handleGraphQLError(error: string): Observable<any> {
    return throwError(error);
  }

  /**
   * Taps progress.
   * @param withProgress indicates whether progress should be shown
   */
  private tapProgress(widhProgress: boolean): MonoTypeOperatorFunction<any> {
    let handler = () => {};
    if (widhProgress) {
      handler = this.httpProgress.handlers.mainView.tapStopperObservable;
    }
    return tap(handler, handler, handler);
  }

  /**
   * Taps errors.
   */
  private tapError(): MonoTypeOperatorFunction<any> {
    return tap(
      () => {},
      (error: any) => {
        const unauthorized: boolean =
          error.networkError && error.networkError.status === EHTTP_STATUS.BAD_REQUEST;
        if (unauthorized) {
          this.checkErrorStatusAndRedirect(EHTTP_STATUS.UNAUTHORIZED);
        }
      },
    );
  }
}
