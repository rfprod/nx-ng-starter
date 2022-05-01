import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';

import { userActions } from './user.actions';
import { IUserState, userInitialState } from './user.interface';
import { AppUserState } from './user.state';

describe('AppUserState', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [NgxsModule.forRoot([AppUserState], { developmentMode: true })],
  };

  let store: Store;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
      });
  }));

  it('state selector should return the whole state', waitForAsync(() => {
    void store
      .selectOnce(AppUserState.state)
      .pipe(
        tap(state => {
          expect(state).toEqual(userInitialState);
        }),
      )
      .subscribe();
  }));

  it('email selector should return partial state', waitForAsync(() => {
    void store
      .selectOnce(AppUserState.email)
      .pipe(
        tap(state => {
          expect(state).toEqual(userInitialState.email);
        }),
      )
      .subscribe();
  }));

  it('token selector should return partial state', waitForAsync(() => {
    void store
      .selectOnce(AppUserState.token)
      .pipe(
        tap(state => {
          expect(state).toEqual(userInitialState.token);
        }),
      )
      .subscribe();
  }));

  it('admin selector should return partial state', waitForAsync(() => {
    void store
      .selectOnce(AppUserState.admin)
      .pipe(
        tap(state => {
          expect(state).toEqual(userInitialState.admin);
        }),
      )
      .subscribe();
  }));

  describe('setState action', () => {
    it('should set the user state correctly when only the email property is present in the payload', waitForAsync(() => {
      const state = <Partial<IUserState>>{ email: 'test@test.test' };
      void store
        .dispatch(new userActions.setState(state))
        .pipe(
          switchMap(() => store.selectOnce(AppUserState.state)),
          tap(result => {
            expect(result.email).toEqual(state.email);
          }),
        )
        .subscribe();
    }));

    it('should set the user state whan only the admin property is present in the payload', waitForAsync(() => {
      const state = <Partial<IUserState>>{ admin: true };
      void store
        .dispatch(new userActions.setState(state))
        .pipe(
          switchMap(() => store.selectOnce(AppUserState.state)),
          tap(result => {
            expect(result.admin).toEqual(state.admin);
          }),
        )
        .subscribe();
    }));

    it('should set the user state whan only the token property is present in the payload', waitForAsync(() => {
      const state = <Partial<IUserState>>{ token: 'xx' };
      void store
        .dispatch(new userActions.setState(state))
        .pipe(
          switchMap(() => store.selectOnce(AppUserState.state)),
          tap(result => {
            expect(result.token).toEqual(state.token);
          }),
        )
        .subscribe();
    }));
  });
});
