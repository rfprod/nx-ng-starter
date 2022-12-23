import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom, of } from 'rxjs';

import { featureAccessSelectors } from '../../feature-access.selectors';
import { AppFeatureAccessGuard } from '../feature-access/feature-access.guard';

describe('AppFeatureAccessGuard', () => {
  let guard: AppFeatureAccessGuard;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
    });
    guard = TestBed.inject(AppFeatureAccessGuard);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should select `enable` state from store and return an url tree', async () => {
    const storeSelectSpy = jest.spyOn(store, 'select').mockImplementation(() => of(false));
    const route = <ActivatedRouteSnapshot>{};
    const state = { root: { data: { feature: void 0 } } } as unknown as RouterStateSnapshot;
    const result = await firstValueFrom(guard.canActivate(route, state));
    expect(storeSelectSpy).toHaveBeenCalledWith(featureAccessSelectors.enable);
    expect(result instanceof UrlTree).toBeTruthy();
  });

  it('canActivate should select `enable` state from store and return a boolean', async () => {
    const storeSelectSpy = jest.spyOn(store, 'select').mockImplementation(() => of(true));
    const route = <ActivatedRouteSnapshot>{};
    const state = { root: { data: { feature: void 0 } } } as unknown as RouterStateSnapshot;
    const result = await firstValueFrom(guard.canActivate(route, state));
    expect(storeSelectSpy).toHaveBeenCalledWith(featureAccessSelectors.enable);
    expect(typeof result === 'boolean').toBeTruthy();
  });

  it('canActivate should select `enableFeature` state from store and return an url tree', async () => {
    const storeSelectSpy = jest.spyOn(store, 'select').mockImplementation(() => of(false));
    const route = <ActivatedRouteSnapshot>{};
    const state = { root: { data: { feature: 'test' } } } as unknown as RouterStateSnapshot;
    const result = await firstValueFrom(guard.canActivate(route, state));
    expect(storeSelectSpy).not.toHaveBeenCalledWith(featureAccessSelectors.enable);
    expect(storeSelectSpy).toHaveBeenCalledTimes(1);
    expect(result instanceof UrlTree).toBeTruthy();
  });

  it('canActivate should select `enableFeature` state from store and return a boolean', async () => {
    const storeSelectSpy = jest.spyOn(store, 'select').mockImplementation(() => of(true));
    const route = <ActivatedRouteSnapshot>{};
    const state = { root: { data: { feature: 'test' } } } as unknown as RouterStateSnapshot;
    const result = await firstValueFrom(guard.canActivate(route, state));
    expect(storeSelectSpy).not.toHaveBeenCalledWith(featureAccessSelectors.enable);
    expect(storeSelectSpy).toHaveBeenCalledTimes(1);
    expect(typeof result === 'boolean').toBeTruthy();
  });
});
