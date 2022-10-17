import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { AppWebsocketApiService } from './services/websocket-api.service';
import { websocketActions } from './websocket.actions';
import { AppWebsocketEffects } from './websocket.effects';
import { featureName, IWebsocketState } from './websocket.interface';
import { AppWebsocketReducer } from './websocket.reducer';

describe('AppWebsocketEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IWebsocketState>(featureName, AppWebsocketReducer.token),
      EffectsModule.forFeature([AppWebsocketEffects]),
    ],
    providers: [
      AppWebsocketReducer.provider,
      {
        provide: AppWebsocketApiService,
        useValue: {
          connect: () => of({}),
          sendEvent: () => void 0,
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IWebsocketState>;
  let api: AppWebsocketApiService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        api = TestBed.inject(AppWebsocketApiService);
      });
  }));

  it('should call api service connect method when the connect action is dispatched, payload #1', waitForAsync(() => {
    const connectSpy = jest.spyOn(api, 'connect');
    store.dispatch(websocketActions.connect());
    expect(connectSpy).toHaveBeenCalledWith();
  }));

  it('should call api service connect method when the connect action is dispatched, payload #2', waitForAsync(() => {
    const connectSpy = jest.spyOn(api, 'connect').mockImplementation(() => of({ data: 1, event: 'users' }));
    store.dispatch(websocketActions.connect());
    expect(connectSpy).toHaveBeenCalledWith();
  }));

  it('should call router.navigate when the logout action is dispatched', waitForAsync(() => {
    const sendEventSpy = jest.spyOn(api, 'sendEvent');
    store.dispatch(websocketActions.getEvents());
    expect(sendEventSpy).toHaveBeenCalledWith('events');
  }));
});
