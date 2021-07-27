import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { userActions } from './user.actions';
import { IUserState, TUserPayload, USER_STATE_TOKEN, userInitialState } from './user.interface';

@State<IUserState>({
  name: USER_STATE_TOKEN,
  defaults: {
    ...userInitialState,
  },
})
@Injectable()
export class AppUserState {
  @Selector()
  public static model(state: IUserState) {
    return state;
  }

  @Selector()
  public static email(state: IUserState) {
    return state.email;
  }

  @Selector()
  public static token(state: IUserState) {
    return state.token;
  }

  @Selector()
  public static admin(state: IUserState) {
    return state.admin;
  }

  @Action(userActions.setState)
  public setState(ctx: StateContext<IUserState>, { payload }: TUserPayload) {
    const currentState: IUserState = ctx.getState();
    const email = typeof payload.email !== 'undefined' ? payload.email : currentState.email;
    const admin = typeof payload.admin === 'boolean' ? payload.admin : currentState.admin;
    const token = typeof payload.token !== 'undefined' ? payload.token : currentState.token;
    const newState: IUserState = { email, admin, token };
    return ctx.patchState(newState);
  }
}
