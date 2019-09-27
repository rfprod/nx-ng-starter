import { Action, Selector, State, StateContext } from '@ngxs/store';

import { UserPayload, UserStateModel } from './user.interface';

import { actionPayloadConstructor } from '@nx-ng-starter/shared-core/util';

const createAction = actionPayloadConstructor('User');
const SetState = createAction<UserPayload>('Set state');

@State<UserStateModel>({
  name: 'user',
  defaults: {
    email: '',
    admin: false,
    token: '',
  },
})
class UserState {
  @Selector()
  public static Model(state: UserStateModel) {
    return state;
  }

  @Selector()
  public static Email(state: UserStateModel) {
    return state.email;
  }

  @Selector()
  public static Token(state: UserStateModel) {
    return state.token;
  }

  @Selector()
  public static Admin(state: UserStateModel) {
    return state.admin;
  }

  @Action(SetState)
  public setState(ctx: StateContext<UserStateModel>, { payload }: UserPayload) {
    // Reuses values from previous state if payload is partial.
    const currentState: UserStateModel = ctx.getState();
    const email = payload.email || currentState.email;
    const admin = typeof payload.admin === 'boolean' ? payload.admin : currentState.admin;
    const token = payload.token || currentState.token;
    const newState: UserStateModel = new UserStateModel({ email, admin, token });
    return ctx.patchState(newState);
  }
}

const userActions = {
  SetState,
};
export { UserState, userActions };
