import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { themeActions } from './theme.actions';
import { AppThemeEffects } from './theme.effects';
import { featureName, IThemeState } from './theme.interface';
import { AppThemeReducer } from './theme.reducer';

describe('AppThemeEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IThemeState>(featureName, AppThemeReducer.token), EffectsModule.forFeature([AppThemeEffects])],
    providers: [AppThemeReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IThemeState>;
  let overlay: OverlayContainer;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        overlay = TestBed.inject(OverlayContainer);
      });
  }));

  it('should add "unicorn-dark-theme" class to the overlay container when the enableDarkTheme action is dispatched', waitForAsync(() => {
    const addSpy = jest.spyOn(overlay.getContainerElement().classList, 'add');
    store.dispatch(themeActions.enableDarkTheme());
    expect(addSpy).toHaveBeenCalledWith('unicorn-dark-theme');
  }));

  it('should remove "unicorn-dark-theme" class to the overlay container when the disableDarkTheme action is dispatched', waitForAsync(() => {
    const removeSpy = jest.spyOn(overlay.getContainerElement().classList, 'remove');
    store.dispatch(themeActions.disableDarkTheme());
    expect(removeSpy).toHaveBeenCalledWith('unicorn-dark-theme');
  }));

  it('should add/remove "unicorn-dark-theme" class to/from the overlay container when the toggleDarkTheme action is dispatched', waitForAsync(() => {
    const addSpy = jest.spyOn(overlay.getContainerElement().classList, 'add');
    const removeSpy = jest.spyOn(overlay.getContainerElement().classList, 'remove');
    store.dispatch(themeActions.toggleDarkTheme());
    expect(addSpy).toHaveBeenCalledWith('unicorn-dark-theme');
    store.dispatch(themeActions.toggleDarkTheme());
    expect(removeSpy).toHaveBeenCalledWith('unicorn-dark-theme');
  }));
});
