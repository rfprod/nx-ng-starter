import { Injectable } from '@angular/core';
import { ApolloClient, ApolloClientOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core';
import { AppHttpHandlersService, TGqlClient } from '@app/client-store-http-progress';
import { IUserState, userSelectors } from '@app/client-store-user';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { from, Observable, of } from 'rxjs';
import { first, map, switchMap, tap } from 'rxjs/operators';

/**
 * Client Graphql service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppGqlService {
  private readonly userToken$ = this.store.select(userSelectors.token).pipe(first());

  constructor(
    private readonly apollo: Apollo,
    private readonly handlers: AppHttpHandlersService,
    private readonly store: Store<IUserState>,
  ) {}

  /**
   * Creates apollo client for a specific user role.
   * @param name the client name
   */
  public createApolloClient(name: TGqlClient = 'graphql'): Observable<ApolloClientOptions<NormalizedCacheObject>> {
    return this.getApolloClientOptions(name).pipe(
      tap(options => {
        this.apollo.create(options, name);
      }),
    );
  }

  /**
   * Resets apollo client for a specific user role.
   * @param name the client name
   */
  public resetApolloClient(name: TGqlClient = 'graphql') {
    return this.getApolloClientOptions(name).pipe(
      switchMap(options => {
        const newClient = new ApolloClient(options);
        const client = <ApolloClient<NormalizedCacheObject> | undefined>this.apollo.use(name).client;
        return this.clearClient(client).pipe(
          tap(() => {
            this.apollo.use(name).client = newClient;
          }),
        );
      }),
    );
  }

  /**
   * Gql query - a read-only fetch.
   * @param query the quesry
   * @param name the client name
   * @param variables the query arguments
   */
  public query<T>(query: DocumentNode, name: TGqlClient = 'graphql', variables: Record<string, unknown> = {}) {
    const observable = this.apollo.use(name).watchQuery<T>({
      query,
      variables,
      fetchPolicy: 'no-cache',
    }).valueChanges;
    return this.handlers.pipeGqlResponse<T>(observable);
  }

  /**
   * Gql mutation - a write followed by a fetch.
   * @param mutation the muration
   * @param name the client name
   * @param variables the mutation arguments
   */
  public mutate<T>(mutation: DocumentNode, name: TGqlClient = 'graphql', variables: Record<string, unknown> = {}) {
    const observable = this.apollo.use(name).mutate<T>({
      mutation,
      variables,
      fetchPolicy: 'no-cache',
    });
    return this.handlers.pipeGqlResponse<T>(observable);
  }

  /**
   * Returns apollo client options depending on user role.
   * @param name the client name
   */
  private getApolloClientOptions(name: TGqlClient): Observable<ApolloClientOptions<NormalizedCacheObject>> {
    return this.userToken$.pipe(
      map(token => this.handlers.createGqlLink(token, name)),
      map(link => {
        const options: ApolloClientOptions<NormalizedCacheObject> = {
          link,
          cache: new InMemoryCache({ resultCaching: false }),
          defaultOptions: {
            query: {
              errorPolicy: 'all',
            },
            watchQuery: {
              errorPolicy: 'all',
            },
            mutate: {
              errorPolicy: 'all',
            },
          },
        };
        return options;
      }),
    );
  }

  /**
   * Clears apollo client.
   * @param client apollo client
   */
  private clearClient(client?: ApolloClient<NormalizedCacheObject>) {
    return typeof client !== 'undefined' ? from(client.resetStore()) : of(null);
  }
}
