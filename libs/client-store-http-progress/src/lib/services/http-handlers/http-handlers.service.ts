import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApolloLink,
  ApolloQueryResult,
  FetchResult,
  Operation,
  ServerError,
  ServerParseError,
  split,
  UriFunction,
} from '@apollo/client/core/';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { HTTP_STATUS, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV } from '@app/client-util';
import { Store } from '@ngrx/store';
import { MutationResult } from 'apollo-angular';
import { HttpLink, HttpLinkHandler } from 'apollo-angular/http';
import { createUploadLink } from 'apollo-upload-client';
import memo from 'memo-decorator';
import { MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { catchError, finalize, map, tap, timeout } from 'rxjs/operators';

import { httpProgressActions } from '../../http-progress.actions';
import { IHttpProgressState } from '../../http-progress.interface';
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

  constructor(
    private readonly store: Store<IHttpProgressState>,
    private readonly toaster: AppToasterService,
    private readonly httpLink: HttpLink,
    private readonly router: Router,
    @Inject(WEB_CLIENT_APP_ENV) private readonly env: IWebClientAppEnvironment,
  ) {}

  /**
   * Gets gql http headers.
   * @param userToken user token
   * @returns the gql headers observable
   */
  public getGraphQLHttpHeaders(userToken: string) {
    return new HttpHeaders({
      Authorization: `Token ${userToken}`,
    });
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
    this.store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapError<T>(),
      catchError(err => this.handleError(err)),
      finalize(() => {
        this.store.dispatch(httpProgressActions.stop({ payload: { mainView: true } }));
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
  public pipeGqlResponse<T>(observable: Observable<ApolloQueryResult<T> | FetchResult<T> | MutationResult<T>>) {
    this.store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapError(),
      map(result => ('data' in result ? result.data : result)),
      catchError(err => this.handleGqlError(err)),
      finalize(() => {
        this.store.dispatch(httpProgressActions.stop({ payload: { mainView: true } }));
      }),
    );
  }

  /**
   * Gets the gql network link.
   * @param hander http link handler
   * @param uri universal resource indentifier
   * @param userToken user token
   * @returns gql link
   */
  private createGqlNetworkLink(splitTest: (op: Operation) => boolean, hander: HttpLinkHandler, uri: string, userToken: string) {
    return split(
      splitTest,
      hander,
      createUploadLink({
        uri,
        headers: { Authorization: `Token ${userToken}` },
      }) as unknown as ApolloLink,
    );
  }

  /**
   * Gql link split test function.
   */
  public gqlLinkSplitTest() {
    const uploadMutations = ['UploadFile'];
    return (operation: Operation) => {
      const { name } = getMainDefinition(operation.query);
      return typeof name === 'undefined' || !uploadMutations.includes(name.value);
    };
  }

  /**
   * Gets the gql error link handler.
   * @returns apollo error link handler
   */
  public gqlErrorLinkHandler(error: ErrorResponse) {
    const { graphQLErrors, networkError } = error;

    let errorMessage = '';

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
        const code = (<(ServerParseError & ServerError) | null>networkError)?.statusCode;
        const result = `[Network error ${code}]: ${networkError?.message}`;
        errorMessage += result;
      }
    }

    errorMessage = errorMessage.length === 0 ? 'Graphql request error' : errorMessage;

    this.toaster.showToaster(errorMessage, 'error');
  }

  /**
   * Creates the gql link with an error handler.
   * @param userToken user token
   * @param name the client name
   * @returns apollo link observable
   */
  public createGqlLink(userToken: string, name: TGqlClient = 'graphql'): ApolloLink {
    const uri = this.getEndpoint(name);
    const uriFn = this.gqlUriFunction(uri);
    const httpLinkHandler = this.httpLink.create({
      uri: uriFn,
    });
    const linkHandler: ApolloLink = onError((error: ErrorResponse) => this.gqlErrorLinkHandler(error));
    const splitTest = this.gqlLinkSplitTest();
    const networkLink = this.createGqlNetworkLink(splitTest, httpLinkHandler, uri, userToken);
    return linkHandler.concat(networkLink);
  }

  /**
   * Gql URI function.
   * @param uri graphql endpoint
   */
  public gqlUriFunction(uri: string): UriFunction {
    return (operation: Operation) => {
      return `${uri}?operation=${operation.operationName}`;
    };
  }

  /**
   * Check error status, and reset token if status is 401.
   * @param status error status
   */
  public checkErrorStatusAndRedirect(status: HTTP_STATUS): void {
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      const message = 'Something went wrong during authorization or you are not authorized to see this content.';
      this.toaster.showToaster(message, 'error');
      void this.router.navigate([{ outlets: { primary: [''] } }]);
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
