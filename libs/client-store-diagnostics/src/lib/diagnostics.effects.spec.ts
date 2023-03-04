import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { diagnosticsActions } from './diagnostics.actions';
import { AppDiagnosticsEffects } from './diagnostics.effects';
import { diagnosticsReducerConfig, IDiagnosticsState } from './diagnostics.interface';
import { diagnosticsReducerProvider } from './diagnostics.reducer';
import { AppWebsocketApiService } from './services/websocket/websocket-api.service';

describe('AppDiagnosticsEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IDiagnosticsState>(diagnosticsReducerConfig.featureName, diagnosticsReducerConfig.token),
      EffectsModule.forFeature([AppDiagnosticsEffects]),
    ],
    providers: [
      diagnosticsReducerProvider,
      {
        provide: AppWebsocketApiService,
        useValue: {
          connect: () => of({}),
          sendEvent: () => void 0,
          startDiagEvents: () => void 0,
          stopDiagEvents: () => void 0,
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IDiagnosticsState>;
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
    store.dispatch(diagnosticsActions.connect());
    expect(connectSpy).toHaveBeenCalledWith();
  }));

  it('should call api service connect method when the connect action is dispatched, payload #2', waitForAsync(() => {
    const connectSpy = jest.spyOn(api, 'connect').mockImplementation(() => of({ data: [], event: 'users' }));
    store.dispatch(diagnosticsActions.connect());
    expect(connectSpy).toHaveBeenCalledWith();
  }));

  it('should start events on action dispatch', waitForAsync(() => {
    const sendEventSpy = jest.spyOn(api, 'startDiagEvents');
    store.dispatch(diagnosticsActions.startEvents());
    expect(sendEventSpy).toHaveBeenCalled();
  }));

  it('should stop events on action dispatch', waitForAsync(() => {
    const sendEventSpy = jest.spyOn(api, 'stopDiagEvents');
    store.dispatch(diagnosticsActions.stopEvents());
    expect(sendEventSpy).toHaveBeenCalled();
  }));
});
