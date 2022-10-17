import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { httpProgressActions } from './http-progress.actions';
import { AppHttpProgressEffects } from './http-progress.effects';
import { featureName, IHttpProgressState, IShowToastPayload } from './http-progress.interface';
import { AppHttpProgressReducer } from './http-progress.reducer';
import { AppHttpProgressService } from './services/http-progress/http-progress.service';
import { AppToasterService } from './services/toaster/toaster.service';

describe('AppHttpProgressEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IHttpProgressState>(featureName, AppHttpProgressReducer.token),
      EffectsModule.forFeature([AppHttpProgressEffects]),
    ],
    providers: [
      AppHttpProgressReducer.provider,
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

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        progressService = TestBed.inject(AppHttpProgressService);
        toasterService = TestBed.inject(AppToasterService);
      });
  }));

  it('should call global progress hander start when the start action is dispatched with payload { mainView: true }', waitForAsync(() => {
    store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
    expect(progressService.globalProgressHandler.start).toHaveBeenCalled();
  }));

  it('should call global progress hander stop when the start action is dispatched with payload { mainView: false }', waitForAsync(() => {
    store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
    store.dispatch(httpProgressActions.stop({ payload: { mainView: true } }));
    expect(progressService.globalProgressHandler.stop).toHaveBeenCalled();
  }));

  it('should call displayToast start when the displayToast action is dispatched', waitForAsync(() => {
    const payload: IShowToastPayload = { message: 'test', type: 'accent', duration: 1000 };
    store.dispatch(httpProgressActions.displayToast({ payload }));
    expect(toasterService.showToaster).toHaveBeenCalledWith(payload.message, payload.type, payload.duration);
  }));
});
