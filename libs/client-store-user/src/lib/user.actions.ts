import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { featureName, IUserStateModel } from './user.interface';

const login = createAction(actionType(featureName, 'login'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

const logout = createAction(actionType(featureName, 'logout'));

const signup = createAction(actionType(featureName, 'signup'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

export const userActions = {
  login,
  logout,
  signup,
};
