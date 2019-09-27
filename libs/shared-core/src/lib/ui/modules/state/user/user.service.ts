import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngxs/store';

import { UserState, userActions } from './user.store';

import {
  IUserHandlers,
  IUserObservableOutput,
  IUserStatePayload,
  UserStateModel,
} from './user.interface';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class UserService {
  public readonly output: IUserObservableOutput = {
    model$: this.store.select(UserState.Model),
    email$: this.store.select(UserState.Email),
    token$: this.store.select(UserState.Token),
    admin$: this.store.select(UserState.Admin),
    isLoggedInSubscription$: this.store
      .select(UserState.Model)
      .pipe(map((model: UserStateModel) => (model.token ? true : false))),
  };

  public readonly handlers: IUserHandlers = {
    setState: (payload: IUserStatePayload) => this.setState(payload),
  };

  constructor(private readonly store: Store) {
    this.restoreUserFromLocalStorage();
  }

  private saveUserToLocalStorage(model: UserStateModel): void {
    localStorage.setItem('userService', JSON.stringify(model));
  }

  private restoreUserFromLocalStorage(): void {
    if (
      localStorage.getItem('userService') &&
      typeof localStorage.getItem('userService') !== 'undefined' &&
      JSON.parse(localStorage.getItem('userService')) instanceof UserStateModel
    ) {
      this.setState(JSON.parse(localStorage.getItem('userService')));
    }
  }

  private setState(payload: IUserStatePayload): Observable<any> {
    return this.store.dispatch(new userActions.SetState(payload)).pipe(
      tap((state: UserStateModel) => {
        this.saveUserToLocalStorage(state);
      }),
    );
  }
}

/**
 * User service factory constructor.
 */
export type UserServiceFactoryConstructor = (store: Store) => UserService;

/**
 * User service factory.
 */
export const userServiceFactory: UserServiceFactoryConstructor = (store: Store) => {
  return new UserService(store);
};

/**
 * User service provider.
 */
export const userServiceProvider: Provider = {
  provide: UserService,
  useFactory: userServiceFactory,
  deps: [Store],
};
