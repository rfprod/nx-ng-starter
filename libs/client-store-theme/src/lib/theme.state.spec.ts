import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';

import { themeActions } from './theme.actions';
import { IThemeState, themeInitialState } from './theme.interface';
import { AppThemeState } from './theme.state';

describe('AppThemeState', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [OverlayModule, NgxsModule.forRoot([AppThemeState], { developmentMode: true })],
  };

  let store: Store;
  let overlayContainer: OverlayContainer;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        overlayContainer = TestBed.inject(OverlayContainer);
      });
  }));

  it('state selector should return the whole state', waitForAsync(() => {
    void store
      .selectOnce(AppThemeState.state)
      .pipe(
        tap(state => {
          expect(state).toEqual(themeInitialState);
        }),
      )
      .subscribe();
  }));

  it('email selector should return partial state', waitForAsync(() => {
    void store
      .selectOnce(AppThemeState.darkThemeEnabled)
      .pipe(
        tap(state => {
          expect(state).toEqual(themeInitialState.darkThemeEnabled);
        }),
      )
      .subscribe();
  }));

  it('enableDarkTheme should modify the theme state as expected', waitForAsync(() => {
    const spy = jest.spyOn(overlayContainer.getContainerElement().classList, 'add');
    void store
      .dispatch(new themeActions.enableDarkTheme())
      .pipe(
        switchMap(() => store.selectOnce(AppThemeState.state)),
        tap(result => {
          const expectedState = <IThemeState>{ darkThemeEnabled: true };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith('unicorn-dark-theme');
        }),
      )
      .subscribe();
  }));

  it('disableDarkTheme should modify the theme state as expected', waitForAsync(() => {
    const spy = jest.spyOn(overlayContainer.getContainerElement().classList, 'remove');
    void store
      .dispatch(new themeActions.disableDarkTheme())
      .pipe(
        switchMap(() => store.selectOnce(AppThemeState.state)),
        tap(result => {
          const expectedState = <IThemeState>{ darkThemeEnabled: false };
          expect(result).toMatchObject(expectedState);
          expect(spy).toHaveBeenCalledWith('unicorn-dark-theme');
        }),
      )
      .subscribe();
  }));

  it('toggleDarkTheme action should toggle the theme state', waitForAsync(() => {
    const enableSpy = jest.spyOn(overlayContainer.getContainerElement().classList, 'add');
    const disableSpy = jest.spyOn(overlayContainer.getContainerElement().classList, 'remove');
    void store
      .dispatch(new themeActions.toggleDarkTheme())
      .pipe(
        switchMap(() => store.selectOnce(AppThemeState.state)),
        tap(result => {
          const expectedState = <IThemeState>{ darkThemeEnabled: true };
          expect(result).toMatchObject(expectedState);
          expect(enableSpy).toHaveBeenCalledWith('unicorn-dark-theme');
        }),
        switchMap(() => store.dispatch(new themeActions.toggleDarkTheme())),
        switchMap(() => store.selectOnce(AppThemeState.state)),
        tap(result => {
          const expectedState = <IThemeState>{ darkThemeEnabled: false };
          expect(result).toMatchObject(expectedState);
          expect(disableSpy).toHaveBeenCalledWith('unicorn-dark-theme');
        }),
      )
      .subscribe();
  }));

  it('setState should set the theme state', waitForAsync(() => {
    const state = <IThemeState>{ darkThemeEnabled: true };
    void store
      .dispatch(new themeActions.setState(state))
      .pipe(
        switchMap(() => store.selectOnce(AppThemeState.state)),
        tap(result => {
          expect(result).toMatchObject(state);
        }),
      )
      .subscribe();
  }));
});
