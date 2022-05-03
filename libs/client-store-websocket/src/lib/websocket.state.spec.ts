import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of, switchMap, tap } from 'rxjs';

import { AppWebsocketApiService } from './services/websocket-api.service';
import { websocketActions } from './websocket.actions';
import { IAppWebsocketState, websocketInitialState } from './websocket.interface';
import { AppWebsocketState } from './websocket.state';

describe('AppWebsocketState', () => {
  const sampleConnectResponse = {
    event: 'users',
    data: 5,
  };

  const testBedConfig: TestModuleMetadata = {
    imports: [NgxsModule.forRoot([AppWebsocketState], { developmentMode: true })],
    providers: [
      {
        provide: AppWebsocketApiService,
        useValue: {
          connect: () => of({ ...sampleConnectResponse }),
          sendEvent: (eventType: string) => void 0,
        },
      },
    ],
  };

  let store: Store;
  let api: AppWebsocketApiService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        api = TestBed.inject(AppWebsocketApiService);

        void store.dispatch(new websocketActions.setState(websocketInitialState));
      });
  }));

  it('state selector should return the whole state', waitForAsync(() => {
    void store
      .selectOnce(AppWebsocketState.state)
      .pipe(
        tap(state => {
          expect(state).toEqual(websocketInitialState);
        }),
      )
      .subscribe();
  }));

  it('users selector should return partial state', waitForAsync(() => {
    void store
      .selectOnce(AppWebsocketState.users)
      .pipe(
        tap(state => {
          expect(state).toEqual(websocketInitialState.users);
        }),
      )
      .subscribe();
  }));

  it('events selector should return partial state', waitForAsync(() => {
    void store
      .selectOnce(AppWebsocketState.events)
      .pipe(
        tap(state => {
          expect(state).toEqual(websocketInitialState.events);
        }),
      )
      .subscribe();
  }));

  describe('setState', () => {
    it('should set the state correctly when only users is present in the payload', waitForAsync(() => {
      const state = <Pick<IAppWebsocketState, 'users'>>{ users: 1 };
      void store
        .dispatch(new websocketActions.setState(state))
        .pipe(
          switchMap(() => store.selectOnce(AppWebsocketState.state)),
          tap(result => {
            expect(result.users).toEqual(state.users);
          }),
        )
        .subscribe();
    }));

    it('should set the state correctly when only events is present in the payload', waitForAsync(() => {
      const state = <Pick<IAppWebsocketState, 'events'>>{ events: [{ event: 'users', data: 5 }] };
      void store
        .dispatch(new websocketActions.setState(state))
        .pipe(
          switchMap(() => store.selectOnce(AppWebsocketState.state)),
          tap(result => {
            expect(result.events).toMatchObject(state.events);
          }),
        )
        .subscribe();
    }));
  });

  describe('connect action', () => {
    it('should call the respective api service method and process the event type is "users"', waitForAsync(() => {
      const apiSpy = jest.spyOn(api, 'connect');
      void store
        .dispatch(new websocketActions.connect())
        .pipe(
          tap(() => {
            expect(apiSpy).toHaveBeenCalled();
          }),
          switchMap(() => store.selectOnce(AppWebsocketState.state)),
          tap(result => {
            const state = {
              users: sampleConnectResponse.data,
              events: [{ ...sampleConnectResponse }],
            };
            expect(result).toMatchObject(state);
          }),
        )
        .subscribe();
    }));

    it('should call the respective api service method and process the event type is not "users"', waitForAsync(() => {
      const connectResponseVariation = {
        ...sampleConnectResponse,
        event: 'test',
      };
      const apiSpy = jest.spyOn(api, 'connect');
      apiSpy.mockImplementationOnce(() => of({ ...connectResponseVariation }));
      void store
        .dispatch(new websocketActions.connect())
        .pipe(
          tap(() => {
            expect(apiSpy).toHaveBeenCalled();
          }),
          switchMap(() => store.selectOnce(AppWebsocketState.state)),
          tap(result => {
            const state = {
              users: result.users,
              events: [{ ...connectResponseVariation }],
            };
            expect(result).toMatchObject(state);
          }),
        )
        .subscribe();
    }));
  });

  it('getEvents action should call the respective api service method', waitForAsync(() => {
    const apiSpy = jest.spyOn(api, 'sendEvent');
    void store
      .dispatch(new websocketActions.getEvents())
      .pipe(
        tap(() => {
          expect(apiSpy).toHaveBeenCalledWith('events');
        }),
      )
      .subscribe();
  }));
});
