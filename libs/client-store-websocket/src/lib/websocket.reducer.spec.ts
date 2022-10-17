import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { websocketActions } from './websocket.actions';
import { featureName, IWebsocketState, IWebsocketStateModel } from './websocket.interface';
import { AppWebsocketReducer } from './websocket.reducer';
import { websocketSelectors } from './websocket.selectors';

describe('AppWebsocketReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IWebsocketState>(featureName, AppWebsocketReducer.token)],
    providers: [AppWebsocketReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppWebsocketReducer;
  let store: Store<IWebsocketState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppWebsocketReducer);
        store = TestBed.inject(Store);
      });
  }));

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = AppWebsocketReducer.initialState;
    const expectation: IWebsocketStateModel = { users: 0, events: [] };
    expect(initialState).toEqual(expectation);
  });

  it('should process the connected action correctly (increment users)', waitForAsync(() => {
    const payload: Partial<IWebsocketStateModel> = { users: 1 };
    store.dispatch(websocketActions.connected({ payload }));
    void store
      .select(websocketSelectors.users)
      .pipe(
        first(),
        tap(users => {
          expect(users).toEqual(payload.users);
        }),
      )
      .subscribe();
  }));

  it('should process the connected action correctly (push events, "users")', waitForAsync(() => {
    const payload: IWebsocketStateModel = { events: [{ data: 1, event: 'users' }], users: 0 };
    store.dispatch(websocketActions.connected({ payload }));
    void store
      .select(websocketSelectors.events)
      .pipe(
        first(),
        tap(events => {
          expect(events.length).toEqual(payload.events.length);
          expect(events[0]).toEqual(payload.events[0]);
        }),
      )
      .subscribe();
  }));
});
