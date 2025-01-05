import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { userAction } from './user.actions';
import { type IUserState, type IUserStateModel, userReducerConfig } from './user.interface';
import { AppUserReducer, userReducerProvider } from './user.reducer';
import { userSelector } from './user.selectors';

describe('AppUserReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IUserState>(userReducerConfig.featureName, userReducerConfig.token)],
    providers: [userReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppUserReducer;
  let store: Store<IUserState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    reducer = TestBed.inject(AppUserReducer);
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = userReducerConfig.initialState;
    const expectation: IUserStateModel = { admin: false, email: '', token: '' };
    expect(initialState).toEqual(expectation);
  });

  it('should process the login action correctly', waitForAsync(() => {
    const payload = { email: 'test@test.test' };
    store.dispatch(userAction.login({ payload }));
    void store
      .select(userSelector.email)
      .pipe(
        first(),
        tap(email => {
          expect(email).toEqual(payload.email);
        }),
      )
      .subscribe();
  }));

  it('should process the logout action correctly', waitForAsync(() => {
    const payload = { email: 'test@test.test' };
    store.dispatch(userAction.login({ payload }));
    store.dispatch(userAction.logout());
    void store
      .select(userSelector.email)
      .pipe(
        first(),
        tap(email => {
          expect(email).toEqual(payload.email);
        }),
      )
      .subscribe();
  }));

  it('should process the signup action correctly', waitForAsync(() => {
    const payload = { email: 'test@test.test' };
    store.dispatch(userAction.signup({ payload }));
    void store
      .select(userSelector.email)
      .pipe(
        first(),
        tap(email => {
          expect(email).toEqual(payload.email);
        }),
      )
      .subscribe();
  }));
});
