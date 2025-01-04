import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { userAction } from './user.actions';
import { AppUserEffects } from './user.effects';
import { type IUserState, userReducerConfig } from './user.interface';
import { userReducerProvider } from './user.reducer';

describe('AppUserEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IUserState>(userReducerConfig.featureName, userReducerConfig.token),
      EffectsModule.forFeature([AppUserEffects]),
    ],
    providers: [userReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IUserState>;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => new Promise<boolean>(resolve => resolve(true)));
  });

  it('should call router.navigate when the login action is dispatched', waitForAsync(() => {
    store.dispatch(userAction.login({ payload: { email: 'test@test.test' } }));
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { primary: ['user'], sidebar: [''] } }]);
  }));

  it('should call router.navigate when the logout action is dispatched', waitForAsync(() => {
    store.dispatch(userAction.logout());
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { primary: [''], sidebar: [''] } }]);
  }));

  it('should call router.navigate when the signup action is dispatched', waitForAsync(() => {
    store.dispatch(userAction.signup({ payload: { email: 'test@test.test' } }));
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { primary: ['login'], sidebar: [''] } }]);
  }));
});
