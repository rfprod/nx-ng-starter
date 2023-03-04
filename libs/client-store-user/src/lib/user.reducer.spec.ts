import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { userActions } from './user.actions';
import { IUserState, IUserStateModel, userReducerConfig } from './user.interface';
import { AppUserReducer, userReducerProvider } from './user.reducer';
import { userSelectors } from './user.selectors';

describe('AppUserReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IUserState>(userReducerConfig.featureName, userReducerConfig.token)],
    providers: [userReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppUserReducer;
  let store: Store<IUserState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppUserReducer);
        store = TestBed.inject(Store);
      });
  }));

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
    store.dispatch(userActions.login({ payload }));
    void store
      .select(userSelectors.email)
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
    store.dispatch(userActions.login({ payload }));
    store.dispatch(userActions.logout());
    void store
      .select(userSelectors.email)
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
    store.dispatch(userActions.signup({ payload }));
    void store
      .select(userSelectors.email)
      .pipe(
        first(),
        tap(email => {
          expect(email).toEqual(payload.email);
        }),
      )
      .subscribe();
  }));
});
