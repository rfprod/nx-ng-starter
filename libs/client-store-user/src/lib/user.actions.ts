import { createAction, props } from '@ngrx/store';

import { featureName, IUserStateModel } from './user.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const login = createAction(type('login'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

const logout = createAction(type('logout'));

const signup = createAction(type('signup'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

export const userActions = {
  login,
  logout,
  signup,
};
