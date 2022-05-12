import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { TToastType } from '@app/client-util';
import { NgxsModule, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';

import { httpProgressActions } from './http-progress.actions';
import { AppHttpProgressState } from './http-progress.state';
import { AppHttpProgressService } from './services/http-progress/http-progress.service';
import { AppToasterService } from './services/toaster/toaster.service';

describe('AppHttpProgressState', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [NgxsModule.forRoot([AppHttpProgressState], { developmentMode: true })],
    providers: [
      {
        provide: AppToasterService,
        useValue: {
          showToaster: (message: string, type?: TToastType, duration?: number) => void 0,
        },
      },
      {
        provide: AppHttpProgressService,
        useValue: {
          globalProgressHandler: {
            start: () => void 0,
            stop: () => void 0,
          },
        },
      },
    ],
  };

  let store: Store;
  let toaster: AppToasterService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        toaster = TestBed.inject(AppToasterService);
      });
  }));

  it('state selector should return the whole state', waitForAsync(() => {
    const expectedState = {
      mainView: { counter: 1, loading: true },
      sidebar: { counter: 0, loading: false },
    };
    void store
      .dispatch(new httpProgressActions.startProgress({}))
      .pipe(
        switchMap(() => store.selectOnce(AppHttpProgressState.state)),
        tap(state => {
          expect(state).toEqual(expectedState);
        }),
      )
      .subscribe();
  }));

  it('mainView selector should return partial state', waitForAsync(() => {
    void store
      .dispatch(new httpProgressActions.stopProgress({}))
      .pipe(
        switchMap(() => store.selectOnce(AppHttpProgressState.mainView)),
        tap(state => {
          expect(state).toEqual({ counter: 0, loading: false });
        }),
      )
      .subscribe();
  }));

  it('sidebar selector should return partial state', waitForAsync(() => {
    void store
      .dispatch(new httpProgressActions.stopProgress({}))
      .pipe(
        switchMap(() => store.selectOnce(AppHttpProgressState.sidebar)),
        tap(state => {
          expect(state).toEqual({ counter: 0, loading: false });
        }),
      )
      .subscribe();
  }));

  it('displayToast should show toaster', waitForAsync(() => {
    const toasterSpy = jest.spyOn(toaster, 'showToaster');
    const message = 'test';
    const type: TToastType = 'accent';
    const duration = 1500;
    void store
      .dispatch(new httpProgressActions.displayToast({ message, type, duration }))
      .pipe(
        tap(() => {
          expect(toasterSpy).toHaveBeenCalledWith(message, type, duration);
        }),
      )
      .subscribe();
  }));
});
