import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';

import { themeAction } from './theme.actions';
import { type IThemeState, type IThemeStateModel, themeReducerConfig } from './theme.interface';
import { AppThemeReducer, themeReducerProvider } from './theme.reducer';
import { themeSelector } from './theme.selectors';

describe('AppThemeReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IThemeState>(themeReducerConfig.featureName, themeReducerConfig.token)],
    providers: [themeReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppThemeReducer;
  let store: Store<IThemeState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    reducer = TestBed.inject(AppThemeReducer);
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = themeReducerConfig.initialState;
    const expectation: IThemeStateModel = { darkThemeEnabled: false };
    expect(initialState).toEqual(expectation);
  });

  it('should process the enableDarkTheme action correctly', waitForAsync(() => {
    store.dispatch(themeAction.enableDarkTheme());
    void store
      .select(themeSelector.darkThemeEnabled)
      .pipe(
        first(),
        tap(darkThemeEnabled => {
          expect(darkThemeEnabled).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should process the disableDarkTheme action correctly', waitForAsync(() => {
    store.dispatch(themeAction.enableDarkTheme());
    void store
      .select(themeSelector.darkThemeEnabled)
      .pipe(
        first(),
        tap(darkThemeEnabled => {
          expect(darkThemeEnabled).toBeTruthy();
          store.dispatch(themeAction.disableDarkTheme());
        }),
        switchMap(() => store.select(themeSelector.darkThemeEnabled)),
        tap(darkThemeEnabled => {
          expect(darkThemeEnabled).toBeFalsy();
        }),
      )
      .subscribe();
  }));
});
