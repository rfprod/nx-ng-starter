import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  AppUserStateModel,
  IAppUserStatePayload,
  IUserHandlers,
  IUserObservableOutput,
} from './user.interface';
import { AppUserState, userActions } from './user.store';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  public readonly output: IUserObservableOutput = {
    model$: this.store.select(AppUserState.model),
    email$: this.store.select(AppUserState.email),
    token$: this.store.select(AppUserState.token),
    admin$: this.store.select(AppUserState.admin),
    isLoggedInSubscription$: this.store
      .select(AppUserState.model)
      .pipe(map((model: AppUserStateModel) => (model.token ? true : false))),
  };

  public readonly handlers: IUserHandlers = {
    setState: (payload: IAppUserStatePayload) => this.setState(payload),
  };

  constructor(private readonly store: Store) {
    this.restoreUserFromLocalStorage();
  }

  private saveUserToLocalStorage(model: AppUserStateModel): void {
    localStorage.setItem('userService', JSON.stringify(model));
  }

  private restoreUserFromLocalStorage(): void {
    const userService = localStorage.getItem('userService');
    if (
      userService !== null &&
      typeof userService !== 'undefined' &&
      JSON.parse(userService) instanceof AppUserStateModel
    ) {
      void this.setState(JSON.parse(userService));
    }
  }

  private setState(payload: IAppUserStatePayload): Observable<AppUserStateModel> {
    return this.store.dispatch(new userActions.setState(payload)).pipe(
      tap((state: AppUserStateModel) => {
        this.saveUserToLocalStorage(state);
      }),
    );
  }
}

/**
 * User service factory constructor.
 */
export type TAppUserServiceFactoryConstructor = (store: Store) => AppUserService;

/**
 * User service factory.
 */
export const userServiceFactory: TAppUserServiceFactoryConstructor = (store: Store) => {
  return new AppUserService(store);
};

/**
 * User service provider.
 */
export const userServiceProvider: Provider = {
  provide: AppUserService,
  useFactory: userServiceFactory,
  deps: [Store],
};
