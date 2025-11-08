import { Injectable } from '@angular/core';
import {
  ApolloClient,
  ApolloClientOptions,
  FetchResult,
  NormalizedCacheObject,
  OperationVariables,
  SubscriptionOptions,
  WatchFragmentResult,
} from '@apollo/client/core';
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { ExtraSubscriptionOptions } from 'apollo-angular';
import { type DocumentNode, Kind, NameNode, OperationDefinitionNode, OperationTypeNode } from 'graphql';
import { Observable } from 'rxjs';
import { vi } from 'vitest';

interface IEmptyObject {
  [key: string]: unknown;
}

/** Apollo document node. */
export interface IDocumentNode<
  Result = {
    [key: string]: unknown;
  },
  Variables = {
    [key: string]: unknown;
  },
>
  extends DocumentNode, DocumentTypeDecoration<Result, Variables> {}

class AppMockApolloBase {
  public query = vi.fn().mockResolvedValue({
    data: {
      /* mock data */
    },
  });

  public mutate = vi.fn().mockResolvedValue({
    data: {
      /* mock mutation data */
    },
  });

  public watchQuery = vi.fn().mockReturnValue({
    valueChanges: {
      subscribe: vi.fn(),
    },
  });

  public watchFragment = <FragmentData = unknown, Variables extends OperationVariables = IEmptyObject>(
    options: Record<string, Variables>,
    extra?: ExtraSubscriptionOptions,
  ): Observable<WatchFragmentResult<FragmentData>> => {
    throw new Error('Function not implemented.');
  };

  public subscribe = <T, V extends OperationVariables = IEmptyObject>(
    options: SubscriptionOptions<V, T>,
    extra?: ExtraSubscriptionOptions,
  ): Observable<FetchResult<T>> => {
    throw new Error('Function not implemented.');
  };

  public get client(): ApolloClient<unknown> {
    return {} as ApolloClient<unknown>;
  }

  public set client(client: ApolloClient<unknown>) {
    // setter mock
  }
}

/** Apollo mock. */
@Injectable()
class AppMockApollo {
  public query = vi.fn().mockReturnValue({
    subscribe: vi.fn(),
  });

  public mutate = vi.fn().mockReturnValue({
    subscribe: vi.fn(),
  });

  public create(options: ApolloClientOptions<NormalizedCacheObject>, name?: string): void {
    // create mock
  }

  public use(name: string): unknown {
    return new AppMockApolloBase();
  }
}

/** GraphQL HttpLink mock. */
@Injectable()
class AppMockHttpLink {
  public create() {
    return {
      request: vi.fn().mockReturnValue({
        subscribe: vi.fn(),
      }),
    };
  }
}

const gqlMock = (query: string) => {
  process.stderr.write(`gqlMock query ${query}`);
  // You can define specific behaviors based on the query string
  if (query.includes('SPECIFIC_QUERY')) {
    return {
      kind: Kind.DOCUMENT,
      definitions: [
        {
          kind: Kind.OPERATION_DEFINITION,
          operation: OperationTypeNode.QUERY,
          selectionSet: {},
        } as OperationDefinitionNode,
      ],
    };
  }
  // For all other queries, return a default structure
  return {
    definitions: [
      {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
      },
    ],
  };
};

/** Set up Apollo mocks. */
export function setupApolloMocks() {
  vi.mock('apollo-angular', () => {
    return {
      ['Apollo']: AppMockApollo,
      gql: gqlMock,
      ['ApolloBase']: AppMockApolloBase,
    };
  });

  vi.mock('apollo-angular/http', () => {
    return {
      ['HttpLink']: AppMockHttpLink,
    };
  });

  vi.mock('@apollo/client/utilities', () => {
    return {
      getMainDefinition: vi.fn().mockReturnValue({
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: {
          kind: Kind.NAME,
          value: 'Value',
        } as NameNode,
      }),
    };
  });
}
