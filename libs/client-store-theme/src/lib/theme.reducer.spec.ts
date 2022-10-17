import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';

import { themeActions } from './theme.actions';
import { featureName, IThemeState, IThemeStateModel } from './theme.interface';
import { AppThemeReducer } from './theme.reducer';
import { themeSelectors } from './theme.selectors';

describe('AppThemeReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IThemeState>(featureName, AppThemeReducer.token)],
    providers: [AppThemeReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppThemeReducer;
  let store: Store<IThemeState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppThemeReducer);
        store = TestBed.inject(Store);
      });
  }));

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = AppThemeReducer.initialState;
    const expectation: IThemeStateModel = { darkThemeEnabled: false };
    expect(initialState).toEqual(expectation);
  });

  it('should process the enableDarkTheme action correctly', waitForAsync(() => {
    store.dispatch(themeActions.enableDarkTheme());
    void store
      .select(themeSelectors.darkThemeEnabled)
      .pipe(
        first(),
        tap(darkThemeEnabled => {
          expect(darkThemeEnabled).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should process the disableDarkTheme action correctly', waitForAsync(() => {
    store.dispatch(themeActions.enableDarkTheme());
    void store
      .select(themeSelectors.darkThemeEnabled)
      .pipe(
        first(),
        tap(darkThemeEnabled => {
          expect(darkThemeEnabled).toBeTruthy();
          store.dispatch(themeActions.disableDarkTheme());
        }),
        switchMap(() => store.select(themeSelectors.darkThemeEnabled)),
        tap(darkThemeEnabled => {
          expect(darkThemeEnabled).toBeFalsy();
        }),
      )
      .subscribe();
  }));
});
