import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { themeAction } from './theme.actions';
import { AppThemeEffects } from './theme.effects';
import { type IThemeState, themeReducerConfig } from './theme.interface';
import { themeReducerProvider } from './theme.reducer';

describe('AppThemeEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IThemeState>(themeReducerConfig.featureName, themeReducerConfig.token),
      EffectsModule.forFeature([AppThemeEffects]),
    ],
    providers: [themeReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IThemeState>;
  let overlay: OverlayContainer;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    store = TestBed.inject(Store);
    overlay = TestBed.inject(OverlayContainer);
  });

  it('should add "unicorn-dark-theme" class to the overlay container when the enableDarkTheme action is dispatched', waitForAsync(() => {
    const addSpy = jest.spyOn(overlay.getContainerElement().classList, 'add');
    store.dispatch(themeAction.enableDarkTheme());
    expect(addSpy).toHaveBeenCalledWith('unicorn-dark-theme');
  }));

  it('should remove "unicorn-dark-theme" class to the overlay container when the disableDarkTheme action is dispatched', waitForAsync(() => {
    const removeSpy = jest.spyOn(overlay.getContainerElement().classList, 'remove');
    store.dispatch(themeAction.disableDarkTheme());
    expect(removeSpy).toHaveBeenCalledWith('unicorn-dark-theme');
  }));

  it('should add/remove "unicorn-dark-theme" class to/from the overlay container when the toggleDarkTheme action is dispatched', waitForAsync(() => {
    const addSpy = jest.spyOn(overlay.getContainerElement().classList, 'add');
    const removeSpy = jest.spyOn(overlay.getContainerElement().classList, 'remove');
    store.dispatch(themeAction.toggleDarkTheme());
    expect(addSpy).toHaveBeenCalledWith('unicorn-dark-theme');
    store.dispatch(themeAction.toggleDarkTheme());
    expect(removeSpy).toHaveBeenCalledWith('unicorn-dark-theme');
  }));
});
