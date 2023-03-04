import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';

import { httpProgressActions } from './http-progress.actions';
import { httpProgressReducerConfig, IHttpProgressState, IHttpProgressStateModel, IShowToastPayload } from './http-progress.interface';
import { AppHttpProgressReducer, httpProgressReducerProvider } from './http-progress.reducer';
import { httpProgressSelectors } from './http-progress.selectors';

describe('AppHttpProgressReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IHttpProgressState>(httpProgressReducerConfig.featureName, httpProgressReducerConfig.token)],
    providers: [httpProgressReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppHttpProgressReducer;
  let store: Store<IHttpProgressState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppHttpProgressReducer);
        store = TestBed.inject(Store);
      });
  }));

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
    store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
    void store
      .select(httpProgressSelectors.mainView)
      .pipe(
        first(),
        tap(mainView => {
          expect(mainView.counter).toEqual(1);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.mainView).pipe(first())),
        tap(mainView => {
          const expectedCount = 2;
          expect(mainView.counter).toEqual(expectedCount);
          expect(mainView.loading).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should process the start action correctly (sidebar)', waitForAsync(() => {
    store.dispatch(httpProgressActions.start({ payload: { sidebar: true } }));
    void store
      .select(httpProgressSelectors.sidebar)
      .pipe(
        first(),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(1);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressActions.start({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.sidebar).pipe(first())),
        tap(sidebar => {
          const expectedCount = 2;
          expect(sidebar.counter).toEqual(expectedCount);
          expect(sidebar.loading).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should process the stop action correctly (mainView)', waitForAsync(() => {
    store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
    void store
      .select(httpProgressSelectors.mainView)
      .pipe(
        first(),
        tap(mainView => {
          expect(mainView.counter).toEqual(1);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressActions.start({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.mainView).pipe(first())),
        tap(mainView => {
          const expectedCount = 2;
          expect(mainView.counter).toEqual(expectedCount);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressActions.stop({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.mainView).pipe(first())),
        tap(mainView => {
          expect(mainView.counter).toEqual(1);
          expect(mainView.loading).toBeTruthy();
          store.dispatch(httpProgressActions.stop({ payload: { mainView: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.mainView).pipe(first())),
        tap(mainView => {
          expect(mainView.counter).toEqual(0);
          expect(mainView.loading).toBeFalsy();
        }),
      )
      .subscribe();
  }));

  it('should process the stop action correctly (sidebar)', waitForAsync(() => {
    store.dispatch(httpProgressActions.start({ payload: { sidebar: true } }));
    void store
      .select(httpProgressSelectors.sidebar)
      .pipe(
        first(),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(1);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressActions.start({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.sidebar).pipe(first())),
        tap(sidebar => {
          const expectedCount = 2;
          expect(sidebar.counter).toEqual(expectedCount);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressActions.stop({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.sidebar).pipe(first())),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(1);
          expect(sidebar.loading).toBeTruthy();
          store.dispatch(httpProgressActions.stop({ payload: { sidebar: true } }));
        }),
        switchMap(() => store.select(httpProgressSelectors.sidebar).pipe(first())),
        tap(sidebar => {
          expect(sidebar.counter).toEqual(0);
          expect(sidebar.loading).toBeFalsy();
        }),
      )
      .subscribe();
  }));

  it('should process the displayToast action correctly', waitForAsync(() => {
    const payload: IShowToastPayload = { message: 'test', type: 'accent', duration: 1000 };
    store.dispatch(httpProgressActions.displayToast({ payload }));
    void store
      .select(httpProgressSelectors.toaster)
      .pipe(
        first(),
        tap(toaster => {
          expect(toaster).toEqual(payload);
        }),
      )
      .subscribe();
  }));
});
