import { Location } from '@angular/common';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';

import { routerActions } from './router.actions';
import { AppRouterEffects } from './router.effects';
import { featureName, IRouterState } from './router.interface';

describe('AppRouterEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IRouterState>(featureName, { router: routerReducer }), EffectsModule.forFeature([AppRouterEffects])],
    providers: [
      {
        provide: Location,
        useValue: {
          historyGo: jest.fn(),
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IRouterState>;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;
  let location: Location;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        router = TestBed.inject(Router);
        routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => new Promise<boolean>(resolve => resolve(true)));
        location = TestBed.inject(Location);
        (<jest.Mock>location.historyGo).mockClear();
      });
  }));

  it('should call router.navigate when the navigate action is dispatched', waitForAsync(() => {
    const payload = { path: [{ outlets: { primary: ['test'] } }] };
    store.dispatch(routerActions.navigate({ payload }));
    expect(routerNavigateSpy).toHaveBeenCalledWith(payload.path, { queryParams: void 0 });
  }));

  it('should call location.back when the back action is dispatched', waitForAsync(() => {
    store.dispatch(routerActions.back());
    expect(location.historyGo).toHaveBeenCalledTimes(1);
  }));

  it('should call location.forward when the forward action is dispatched', waitForAsync(() => {
    store.dispatch(routerActions.forward());
    expect(location.historyGo).toHaveBeenCalledTimes(1);
  }));
});
