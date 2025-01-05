import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { httpProgressAction } from './http-progress.actions';
import { AppHttpProgressEffects } from './http-progress.effects';
import { httpProgressReducerConfig, type IHttpProgressState, type IShowToastPayload } from './http-progress.interface';
import { httpProgressReducerProvider } from './http-progress.reducer';
import { AppHttpProgressService } from './services/http-progress/http-progress.service';
import { AppToasterService } from './services/toaster/toaster.service';

describe('AppHttpProgressEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IHttpProgressState>(httpProgressReducerConfig.featureName, httpProgressReducerConfig.token),
      EffectsModule.forFeature([AppHttpProgressEffects]),
    ],
    providers: [
      httpProgressReducerProvider,
      {
        provide: AppHttpProgressService,
        useValue: {
          globalProgressHandler: {
            start: jest.fn(),
            stop: jest.fn(),
          },
        },
      },
      {
        provide: AppToasterService,
        useValue: {
          showToaster: jest.fn(),
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IHttpProgressState>;
  let progressService: AppHttpProgressService;
  let toasterService: AppToasterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    store = TestBed.inject(Store);
    progressService = TestBed.inject(AppHttpProgressService);
    toasterService = TestBed.inject(AppToasterService);
  });

  it('should call global progress hander start when the start action is dispatched with payload { mainView: true }', waitForAsync(() => {
    store.dispatch(httpProgressAction.start({ payload: { mainView: true } }));
    expect(progressService.globalProgressHandler.start).toHaveBeenCalled();
  }));

  it('should call global progress hander stop when the start action is dispatched with payload { mainView: false }', waitForAsync(() => {
    store.dispatch(httpProgressAction.start({ payload: { mainView: true } }));
    store.dispatch(httpProgressAction.stop({ payload: { mainView: true } }));
    expect(progressService.globalProgressHandler.stop).toHaveBeenCalled();
  }));

  it('should call displayToast start when the displayToast action is dispatched', waitForAsync(() => {
    const payload: IShowToastPayload = { message: 'test', type: 'accent', duration: 1000 };
    store.dispatch(httpProgressAction.displayToast({ payload }));
    expect(toasterService.showToaster).toHaveBeenCalledWith(payload.message, payload.type, payload.duration);
  }));
});
