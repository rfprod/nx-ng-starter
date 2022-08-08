import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { sidebarActions } from './sidebar.actions';
import { AppSidebarEffects } from './sidebar.effects';
import { featureName, ISidebarState } from './sidebar.interface';
import { AppSidebarReducer } from './sidebar.reducer';

describe('AppSidebarEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<ISidebarState>(featureName, AppSidebarReducer.token), EffectsModule.forFeature([AppSidebarEffects])],
    providers: [AppSidebarReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<ISidebarState>;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        router = TestBed.inject(Router);
        routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => new Promise<boolean>(resolve => resolve(true)));
      });
  }));

  it('should call router.navigate when the open action is dispatched with payload { navigate: true }', waitForAsync(() => {
    store.dispatch(sidebarActions.open({ payload: { navigate: true } }));
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { sidebar: ['root'] } }]);
  }));

  it('should not call router.navigate when the open action is dispatched with payload { navigate: false }', waitForAsync(() => {
    store.dispatch(sidebarActions.open({ payload: { navigate: false } }));
    expect(routerNavigateSpy).not.toHaveBeenCalledWith([{ outlets: { sidebar: ['root'] } }]);
  }));

  it('should call router.navigate when the close action is dispatched with payload { navigate: true }', waitForAsync(() => {
    store.dispatch(sidebarActions.close({ payload: { navigate: true } }));
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { sidebar: [] } }]);
  }));

  it('should not call router.navigate when the close action is dispatched with payload { navigate: false }', waitForAsync(() => {
    store.dispatch(sidebarActions.close({ payload: { navigate: false } }));
    expect(routerNavigateSpy).not.toHaveBeenCalledWith([{ outlets: { sidebar: [] } }]);
  }));

  it('should call router.navigate when either open or close action is dispatched', waitForAsync(() => {
    store.dispatch(sidebarActions.toggle());
    expect(routerNavigateSpy).toHaveBeenNthCalledWith(1, [{ outlets: { sidebar: ['root'] } }]);
    store.dispatch(sidebarActions.toggle());
    const expectedCalls = 2;
    expect(routerNavigateSpy).toHaveBeenCalledTimes(expectedCalls);
    expect(routerNavigateSpy).toHaveBeenNthCalledWith(expectedCalls, [{ outlets: { sidebar: [] } }]);
  }));
});
