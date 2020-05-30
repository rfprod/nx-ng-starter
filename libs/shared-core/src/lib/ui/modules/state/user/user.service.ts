import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  IUserHandlers,
  IUserObservableOutput,
  IUserStatePayload,
  UserStateModel,
} from './user.interface';
import { userActions, UserState } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public readonly output: IUserObservableOutput = {
    model$: this.store.select(UserState.model),
    email$: this.store.select(UserState.email),
    token$: this.store.select(UserState.token),
    admin$: this.store.select(UserState.admin),
    isLoggedInSubscription$: this.store
      .select(UserState.model)
      .pipe(map((model: UserStateModel) => (Boolean(model.token) ? true : false))),
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
      Boolean(localStorage.getItem('userService')) &&
      typeof localStorage.getItem('userService') !== 'undefined' &&
      JSON.parse(localStorage.getItem('userService')) instanceof UserStateModel
    ) {
      void this.setState(JSON.parse(localStorage.getItem('userService')));
    }
  }

  private setState(payload: IUserStatePayload): Observable<UserStateModel> {
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
