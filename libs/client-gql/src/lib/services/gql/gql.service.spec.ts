import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { ApolloLink } from '@apollo/client/core';
import { AppHttpHandlersService, type TGqlClient } from '@app/client-store-http-progress';
import { AppUserStoreModule } from '@app/client-store-user';
import { getTestBedConfig } from '@app/client-testing-unit';
import { Apollo, type ApolloBase } from 'apollo-angular';
import type { DocumentNode } from 'graphql';
import { lastValueFrom, type Observable, of, tap } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import type { MockInstance } from 'vitest';

import { matcompMutations } from '../../graphql/matcomp/matcomp.mutations';
import { matcompQueries } from '../../graphql/matcomp/matcomp.queries';
import { AppGqlService } from './gql.service';

type TTestSuccessMethodParams = [node: DocumentNode, name?: TGqlClient, variables?: Record<string, unknown>];

describe('AppClientGqlService', () => {
  const testBedConfig: TestModuleMetadata = getTestBedConfig({
    imports: [AppUserStoreModule.forRoot()],
    providers: [
      Apollo,
      AppGqlService,
      {
        provide: AppHttpHandlersService,
        useValue: {
          pipeGqlResponse: <T>(observable$: Observable<T>) => observable$,
          createGqlLink: (token: string, name: TGqlClient) => of(new ApolloLink()),
        },
      },
    ],
  });

  let service: AppGqlService;
  let handlers: AppHttpHandlersService;
  let apollo: Apollo;
  const clientName: TGqlClient = 'graphql';

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    service = TestBed.inject(AppGqlService);
    handlers = TestBed.inject(AppHttpHandlersService);
    apollo = TestBed.inject(Apollo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.query).toEqual(expect.any(Function));
    expect(service.mutate).toEqual(expect.any(Function));
    expect(service.createApolloClient).toEqual(expect.any(Function));
    expect(service.resetApolloClient).toEqual(expect.any(Function));
  });

  describe('public method', () => {
    const result = { result: 'success' };

    const testSuccessMethod = (
      scheduler: TestScheduler,
      spy: MockInstance,
      method: 'query' | 'mutate',
      params: TTestSuccessMethodParams,
    ) => {
      scheduler.run(({ cold, expectObservable }) => {
        // const source$ = cold('-a-b-c-|', { a: 1, b: 2, c: 3 });
        // const expected = '-x-y-z-|'; // Define expected output

        // const result$ = source$.pipe(map(value => value + 1)); // Example transformation

        // expectObservable(result$).toBe(expected, { x: 2, y: 3, z: 4 });

        const q$ = cold('---x|', { x: result });
        spy.mockImplementation(() => q$);

        void service[method](...params).subscribe(response => {
          expect(response).toEqual(result);
        });
        scheduler.flush();
      });
    };

    let pipeResponseSpy: MockInstance;
    let useApolloSpy: MockInstance;
    let valueChanges$: Observable<typeof result>;
    let watchQuerySpy: MockInstance;
    let mutateSpy: MockInstance;

    beforeEach(() => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });

      testScheduler.run(({ cold }) => {
        valueChanges$ = cold('---x|', { x: result });

        pipeResponseSpy = vi.spyOn(handlers, 'pipeGqlResponse');

        watchQuerySpy = vi.fn(() => ({
          valueChanges: valueChanges$,
        }));

        mutateSpy = vi.fn(() => valueChanges$);
      });
    });

    describe('query', () => {
      beforeEach(() => {
        useApolloSpy = vi.spyOn(apollo, 'use').mockImplementation(
          () =>
            new Object({
              watchQuery: watchQuerySpy,
            }) as ApolloBase,
        );
      });

      it('should return proper value after graphQL service mutate call', () => {
        const params: TTestSuccessMethodParams = [{} as DocumentNode];
        const testScheduler = new TestScheduler((actual, expected) => {
          expect(actual).toEqual(expected);
        });
        testSuccessMethod(testScheduler, pipeResponseSpy, 'query', params);
      });

      it('should call query with proper params', () => {
        const id = 'xx';
        const variables = { id };
        void service.query(matcompQueries.matcomp, clientName, variables);
        expect(watchQuerySpy).toHaveBeenCalledWith({
          query: matcompQueries.matcomp,
          variables,
          fetchPolicy: 'no-cache',
        });
      });
    });

    describe('mutate', () => {
      beforeEach(() => {
        useApolloSpy = vi.spyOn(apollo, 'use').mockImplementation(
          () =>
            new Object({
              mutate: mutateSpy,
            }) as ApolloBase,
        );
      });

      it('should call pipe request with proper params', () => {
        const testScheduler = new TestScheduler((actual, expected) => {
          expect(actual).toEqual(expected);
        });

        testScheduler.run(({ cold }) => {
          pipeResponseSpy.mockReturnValue(cold('-|'));
          const id = 'xx';
          const variables = { id };
          void service.mutate(matcompMutations.remove, clientName, variables);
          expect(pipeResponseSpy).toHaveBeenCalledWith(valueChanges$);
        });
      });

      it('should return proper value after shared graphQL service mutate call', () => {
        const params: TTestSuccessMethodParams = [{} as DocumentNode];
        const testScheduler = new TestScheduler((actual, expected) => {
          expect(actual).toEqual(expected);
        });
        testSuccessMethod(testScheduler, pipeResponseSpy, 'mutate', params);
      });

      it('should call apollo.use with proper role', () => {
        const id = 'xx';
        const variables = { id };
        void service.mutate(matcompMutations.remove, clientName, variables);
        expect(useApolloSpy).toHaveBeenCalledWith(clientName);
      });

      it('should call mutate with proper params', () => {
        const id = 'xx';
        const variables = { id };
        void service.mutate(matcompMutations.remove, clientName, variables);
        expect(mutateSpy).toHaveBeenCalledWith({
          mutation: matcompMutations.remove,
          variables,
          fetchPolicy: 'no-cache',
        });
      });
    });

    describe('resetApolloClient', () => {
      beforeEach(() => {
        useApolloSpy = vi.spyOn(apollo, 'use').mockImplementation(
          () =>
            new Object({
              watchQuery: watchQuerySpy,
              client: void 0,
            }) as ApolloBase,
        );
      });

      it('should call apollo use twise and call client.resetStore if client exists with the default client name', async () => {
        await lastValueFrom(service.resetApolloClient());
        const expectation = 2;
        expect(useApolloSpy).toHaveBeenCalledTimes(expectation);
        expect(useApolloSpy).toHaveBeenCalledWith(clientName);
      });

      it('should call apollo use twise and call client.resetStore if client exists when the client name is specified', async () => {
        await lastValueFrom(service.resetApolloClient(clientName));
        const expectation = 2;
        expect(useApolloSpy).toHaveBeenCalledTimes(expectation);
        expect(useApolloSpy).toHaveBeenCalledWith(clientName);
      });

      it('should reset apollo client if it was previously created', () => {
        const apolloBase = new Object({
          watchQuery: watchQuerySpy,
          client: {
            resetStore: () => new Promise<void>(resolve => resolve()),
          },
        }) as ApolloBase;
        const resetStoreSpy = vi.spyOn(apolloBase.client, 'resetStore');
        useApolloSpy = vi.spyOn(apollo, 'use').mockImplementation(() => apolloBase);
        void service
          .resetApolloClient(clientName)
          .pipe(
            tap(() => {
              const expectation = 2;
              expect(useApolloSpy).toHaveBeenCalledTimes(expectation);
              expect(useApolloSpy).toHaveBeenCalledWith(clientName);
              expect(resetStoreSpy).toHaveBeenCalled();
            }),
          )
          .subscribe();
      });
    });
  });

  describe('createApolloClient', () => {
    let createApolloLinkSpy: MockInstance;
    let createApolloSpy: MockInstance;

    beforeEach(() => {
      createApolloLinkSpy = vi.spyOn(handlers, 'createGqlLink');
      createApolloSpy = vi.spyOn(apollo, 'create');
    });

    it('should call apollo createApolloLinkSpy with proper params with the default client name', waitForAsync(() => {
      void service
        .createApolloClient()
        .pipe(
          tap(() => {
            expect(createApolloLinkSpy).toHaveBeenCalledWith('', clientName);
            expect(createApolloSpy).toHaveBeenCalledWith(expect.any(Object), clientName);
          }),
        )
        .subscribe();
    }));

    it('should call apollo createApolloLinkSpy with proper params when the client name is specified', waitForAsync(() => {
      void service
        .createApolloClient(clientName)
        .pipe(
          tap(() => {
            expect(createApolloLinkSpy).toHaveBeenCalledWith('', clientName);
            expect(createApolloSpy).toHaveBeenCalledWith(expect.any(Object), clientName);
          }),
        )
        .subscribe();
    }));
  });
});
