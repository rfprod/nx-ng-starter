import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { actionPayloadConstructor } from '@nx-ng-starter/shared-core/util';

import { TUserPayload, UserStateModel } from './user.interface';

const createAction = actionPayloadConstructor('User');
const setState = createAction<TUserPayload>('Set state');

@State<UserStateModel>({
  name: 'user',
  defaults: {
    email: '',
    admin: false,
    token: '',
  },
})
@Injectable({
  providedIn: 'root',
})
class UserState {
  @Selector()
  public static model(state: UserStateModel) {
    return state;
  }

  @Selector()
  public static email(state: UserStateModel) {
    return state.email;
  }

  @Selector()
  public static token(state: UserStateModel) {
    return state.token;
  }

  @Selector()
  public static admin(state: UserStateModel) {
    return state.admin;
  }

  @Action(setState)
  public setState(ctx: StateContext<UserStateModel>, { payload }: TUserPayload) {
    // Reuses values from previous state if payload is partial.
    const currentState: UserStateModel = ctx.getState();
    const email = Boolean(payload.email) ? payload.email : currentState.email;
    const admin = typeof payload.admin === 'boolean' ? payload.admin : currentState.admin;
    const token = Boolean(payload.token) ? payload.token : currentState.token;
    const newState: UserStateModel = new UserStateModel({ email, admin, token });
    return ctx.patchState(newState);
  }
}

const userActions = {
  setState,
};
export { UserState, userActions };
