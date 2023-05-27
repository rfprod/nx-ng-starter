import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, lastValueFrom } from 'rxjs';

import { sidebarActions } from './sidebar.actions';
import { ISidebarState, ISidebarStateModel, sidebarReducerConfig } from './sidebar.interface';
import { AppSidebarReducer, sidebarReducerProvider } from './sidebar.reducer';
import { sidebarSelectors } from './sidebar.selectors';

describe('AppSidebarReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<ISidebarState>(sidebarReducerConfig.featureName, sidebarReducerConfig.token)],
    providers: [sidebarReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppSidebarReducer;
  let store: Store<ISidebarState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    reducer = TestBed.inject(AppSidebarReducer);
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = sidebarReducerConfig.initialState;
    const expectation: ISidebarStateModel = { sidebarOpen: false };
    expect(initialState).toEqual(expectation);
  });

  it('should process the open action correctly', async () => {
    store.dispatch(sidebarActions.open({ payload: { navigate: false } }));
    const sidebarOpen = await lastValueFrom(store.select(sidebarSelectors.sidebarOpen).pipe(first()));
    expect(sidebarOpen).toBeTruthy();
  });

  it('should process the close action correctly', async () => {
    store.dispatch(sidebarActions.open({ payload: { navigate: false } }));
    let sidebarOpen = await lastValueFrom(store.select(sidebarSelectors.sidebarOpen).pipe(first()));
    expect(sidebarOpen).toBeTruthy();
    store.dispatch(sidebarActions.close({ payload: { navigate: false } }));
    sidebarOpen = await lastValueFrom(store.select(sidebarSelectors.sidebarOpen).pipe(first()));
    expect(sidebarOpen).toBeFalsy();
  });

  it('should process the toggle action correctly', async () => {
    store.dispatch(sidebarActions.toggle());
    let sidebarOpen = await lastValueFrom(store.select(sidebarSelectors.sidebarOpen).pipe(first()));
    expect(sidebarOpen).toBeTruthy();
    store.dispatch(sidebarActions.toggle());
    sidebarOpen = await lastValueFrom(store.select(sidebarSelectors.sidebarOpen).pipe(first()));
    expect(sidebarOpen).toBeFalsy();
  });
});
