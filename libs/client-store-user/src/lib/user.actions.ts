import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { IUserStateModel, userReducerConfig } from './user.interface';

const login = createAction(actionType(userReducerConfig.featureName, 'login'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

const logout = createAction(actionType(userReducerConfig.featureName, 'logout'));

const signup = createAction(actionType(userReducerConfig.featureName, 'signup'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

export const userActions = {
  login,
  logout,
  signup,
};
