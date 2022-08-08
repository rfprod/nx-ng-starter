import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { Store, StoreModule } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';

import { sidebarActions } from './sidebar.actions';
import { featureName, ISidebarState, ISidebarStateModel } from './sidebar.interface';
import { AppSidebarReducer } from './sidebar.reducer';
import { sidebarSelectors } from './sidebar.selectors';

describe('AppSidebarReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<ISidebarState>(featureName, AppSidebarReducer.token)],
    providers: [AppSidebarReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppSidebarReducer;
  let store: Store<ISidebarState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppSidebarReducer);
        store = TestBed.inject(Store);
      });
  }));

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = AppSidebarReducer.initialState;
    const expectation: ISidebarStateModel = { sidebarOpened: false };
    expect(initialState).toEqual(expectation);
  });

  it('should process the open action correctly', waitForAsync(() => {
    store.dispatch(sidebarActions.open({ payload: { navigate: false } }));
    void store
      .select(sidebarSelectors.sidebarOpened)
      .pipe(
        first(),
        tap(sidebarOpened => {
          expect(sidebarOpened).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should process the close action correctly', waitForAsync(() => {
    store.dispatch(sidebarActions.open({ payload: { navigate: false } }));
    void store
      .select(sidebarSelectors.sidebarOpened)
      .pipe(
        first(),
        tap(sidebarOpened => {
          expect(sidebarOpened).toBeTruthy();
          store.dispatch(sidebarActions.close({ payload: { navigate: false } }));
        }),
        switchMap(() => store.select(sidebarSelectors.sidebarOpened).pipe(first())),
        tap(sidebarOpened => {
          expect(sidebarOpened).toBeFalsy();
        }),
      )
      .subscribe();
  }));

  it('should process the toggle action correctly', waitForAsync(() => {
    store.dispatch(sidebarActions.toggle());
    void store
      .select(sidebarSelectors.sidebarOpened)
      .pipe(
        first(),
        tap(sidebarOpened => {
          expect(sidebarOpened).toBeTruthy();
          store.dispatch(sidebarActions.toggle());
        }),
        switchMap(() => store.select(sidebarSelectors.sidebarOpened)),
        tap(sidebarOpened => {
          expect(sidebarOpened).toBeFalsy();
        }),
      )
      .subscribe();
  }));
});
