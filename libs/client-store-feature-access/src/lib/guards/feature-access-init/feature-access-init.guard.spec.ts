import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { featureAccessActions } from '../../feature-access.actions';
import { AppFeatureAccessInitGuard } from './feature-access-init.guard';

describe('AppFeatureAccessInitGuard', () => {
  let guard: AppFeatureAccessInitGuard;
  let store: Store;
  let storeDispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    });
    guard = TestBed.inject(AppFeatureAccessInitGuard);
    store = TestBed.inject(Store);
    storeDispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => void 0);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should dispatch a store event', () => {
    guard.canActivate();
    expect(storeDispatchSpy).toHaveBeenCalledWith(featureAccessActions.initialize());
  });
});
