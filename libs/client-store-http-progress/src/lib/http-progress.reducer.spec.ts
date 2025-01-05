import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';

import { httpProgressAction } from './http-progress.actions';
import {
  httpProgressReducerConfig,
  type IHttpProgressState,
  type IHttpProgressStateModel,
  type IShowToastPayload,
} from './http-progress.interface';
import { AppHttpProgressReducer, httpProgressReducerProvider } from './http-progress.reducer';
import { httpProgressSelector } from './http-progress.selectors';

describe('AppHttpProgressReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IHttpProgressState>(httpProgressReducerConfig.featureName, httpProgressReducerConfig.token)],
    providers: [httpProgressReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppHttpProgressReducer;
  let store: Store<IHttpProgressState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    reducer = TestBed.inject(AppHttpProgressReducer);
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = httpProgressReducerConfig.initialState;
    const expectation: IHttpProgressStateModel = {
      mainView: {
        counter: 0,
        loading: false,
      },
      sidebar: {
        counter: 0,
        loading: false,
      },
      toaster: {
        message: '',
        type: 'primary',
        duration: void 0,
      },
    };
    expect(initialState).toEqual(expectation);
  });

  it('should process the start action correctly (mainView)', waitForAsync(() => {
    store.dispatch(httpProgressAction.start({ payload: { mainView: true } }));
    void store
      .select(httpProgressSelector.mainView)
      .pipe(
        first(),
        tap(mainView => {
          expect(mainView.counter).toEqual(1);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressAction.start({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.mainView).pipe(first())),
        tap(mainView => {
          const expectedCount = 2;
          expect(mainView.counter).toEqual(expectedCount);
          expect(mainView.loading).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should process the start action correctly (sidebar)', waitForAsync(() => {
    store.dispatch(httpProgressAction.start({ payload: { sidebar: true } }));
    void store
      .select(httpProgressSelector.sidebar)
      .pipe(
        first(),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(1);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressAction.start({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.sidebar).pipe(first())),
        tap(sidebar => {
          const expectedCount = 2;
          expect(sidebar.counter).toEqual(expectedCount);
          expect(sidebar.loading).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should process the stop action correctly (mainView)', waitForAsync(() => {
    store.dispatch(httpProgressAction.start({ payload: { mainView: true } }));
    void store
      .select(httpProgressSelector.mainView)
      .pipe(
        first(),
        tap(mainView => {
          expect(mainView.counter).toEqual(1);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressAction.start({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.mainView).pipe(first())),
        tap(mainView => {
          const expectedCount = 2;
          expect(mainView.counter).toEqual(expectedCount);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressAction.stop({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.mainView).pipe(first())),
        tap(mainView => {
          expect(mainView.counter).toEqual(1);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressAction.stop({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.mainView).pipe(first())),
        tap(mainView => {
          expect(mainView.counter).toEqual(0);
          expect(mainView.loading).toBeFalsy();
        }),
      )
      .subscribe();
  }));

  it('should process the stop action correctly (sidebar)', waitForAsync(() => {
    store.dispatch(httpProgressAction.start({ payload: { sidebar: true } }));
    void store
      .select(httpProgressSelector.sidebar)
      .pipe(
        first(),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(1);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressAction.start({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.sidebar).pipe(first())),
        tap(sidebar => {
          const expectedCount = 2;
          expect(sidebar.counter).toEqual(expectedCount);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressAction.stop({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.sidebar).pipe(first())),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(1);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressAction.stop({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelector.sidebar).pipe(first())),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(0);
          expect(sidebar.loading).toBeFalsy();
        }),
      )
      .subscribe();
  }));

  it('should process the displayToast action correctly', waitForAsync(() => {
    const payload: IShowToastPayload = { message: 'test', type: 'accent', duration: 1000 };
    store.dispatch(httpProgressAction.displayToast({ payload }));
    void store
      .select(httpProgressSelector.toaster)
      .pipe(
        first(),
        tap(toaster => {
          expect(toaster).toEqual(payload);
        }),
      )
      .subscribe();
  }));
});
