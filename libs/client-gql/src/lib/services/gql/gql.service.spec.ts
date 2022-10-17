import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { ApolloLink } from '@apollo/client/core';
import { AppHttpHandlersService, TGqlClient } from '@app/client-store-http-progress';
import { AppUserStoreModule } from '@app/client-store-user';
import { getTestBedConfig } from '@app/client-testing-unit';
import { Apollo, ApolloBase, ApolloModule } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Observable, of, tap } from 'rxjs';

import { matcompMutations } from '../../graphql/matcomp/matcomp.mutations';
import { matcompQueries } from '../../graphql/matcomp/matcomp.queries';
import { AppGqlService } from './gql.service';

type TTestSuccessMethodParams = [node: DocumentNode, name?: TGqlClient, variables?: Record<string, unknown>];

describe('AppClientGqlService', () => {
  const testBedConfig: TestModuleMetadata = getTestBedConfig({
    imports: [ApolloModule, AppUserStoreModule.forRoot()],
    providers: [
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

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppGqlService);
        handlers = TestBed.inject(AppHttpHandlersService);
        apollo = TestBed.inject(Apollo);
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.query).toEqual(expect.any(Function));
    expect(service.mutate).toEqual(expect.any(Function));
    expect(service.createApolloClient).toEqual(expect.any(Function));
    expect(service.resetApolloClient).toEqual(expect.any(Function));
  });

  describe('public method', () => {
    const result = { result: 'success' };
    const testSuccessMethod = (spy: jest.SpyInstance, method: 'query' | 'mutate', params: TTestSuccessMethodParams) => {
      const q$ = cold('---x|', { x: result });
      spy.mockImplementation(() => q$);

      void service[method](...params).subscribe(response => {
        expect(response).toEqual(result);
      });
      getTestScheduler().flush();
    };

    let pipeResponseSpy: jest.SpyInstance;
    let useApolloSpy: jest.SpyInstance;
    let valueChanges$: Observable<typeof result>;
    let watchQuerySpy: jest.SpyInstance;
    let mutateSpy: jest.SpyInstance;

    beforeEach(() => {
      valueChanges$ = cold('---x|', { x: result });
      pipeResponseSpy = jest.spyOn(handlers, 'pipeGqlResponse');
      watchQuerySpy = jest.fn(() => ({
        valueChanges: valueChanges$,
      }));
      mutateSpy = jest.fn(() => valueChanges$);
    });

    describe('query', () => {
      beforeEach(() => {
        useApolloSpy = jest.spyOn(apollo, 'use').mockImplementation(
          () =>
            new Object({
              watchQuery: watchQuerySpy,
            }) as ApolloBase,
        );
      });

      it('should return proper value after graphQL service mutate call', () => {
        const params: TTestSuccessMethodParams = [<DocumentNode>{}];
        testSuccessMethod(pipeResponseSpy, 'query', params);
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
        useApolloSpy = jest.spyOn(apollo, 'use').mockImplementation(
          () =>
            new Object({
              mutate: mutateSpy,
            }) as ApolloBase,
        );
      });

      it('should call pipe request with proper params', () => {
        pipeResponseSpy.mockReturnValue(cold('-|'));
        const id = 'xx';
        const variables = { id };
        void service.mutate(matcompMutations.remove, clientName, variables);
        expect(pipeResponseSpy).toHaveBeenCalledWith(valueChanges$);
      });

      it('should return proper value after shared graphQL service mutate call', () => {
        const params: TTestSuccessMethodParams = [<DocumentNode>{}];
        testSuccessMethod(pipeResponseSpy, 'mutate', params);
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
        useApolloSpy = jest.spyOn(apollo, 'use').mockImplementation(
          () =>
            new Object({
              watchQuery: watchQuerySpy,
              client: void 0,
            }) as ApolloBase,
        );
      });

      it('should call apollo use twise and call client.resetStore if client exists with the default client name', waitForAsync(() => {
        void service
          .resetApolloClient()
          .pipe(
            tap(() => {
              const expectation = 2;
              expect(useApolloSpy).toHaveBeenCalledTimes(expectation);
              expect(useApolloSpy).toHaveBeenCalledWith(clientName);
            }),
          )
          .subscribe();
      }));

      it('should call apollo use twise and call client.resetStore if client exists when the client name is specified', waitForAsync(() => {
        void service
          .resetApolloClient(clientName)
          .pipe(
            tap(() => {
              const expectation = 2;
              expect(useApolloSpy).toHaveBeenCalledTimes(expectation);
              expect(useApolloSpy).toHaveBeenCalledWith(clientName);
            }),
          )
          .subscribe();
      }));

      it('should reset apollo client if it was previously created', () => {
        const apolloBase = new Object({
          watchQuery: watchQuerySpy,
          client: {
            resetStore: () => new Promise<void>(resolve => resolve()),
          },
        }) as ApolloBase;
        const resetStoreSpy = jest.spyOn(apolloBase.client, 'resetStore');
        useApolloSpy = jest.spyOn(apollo, 'use').mockImplementation(() => apolloBase);
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
    let createApolloLinkSpy: jest.SpyInstance;
    let createApolloSpy: jest.SpyInstance;

    beforeEach(() => {
      createApolloLinkSpy = jest.spyOn(handlers, 'createGqlLink');
      createApolloSpy = jest.spyOn(apollo, 'create');
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
