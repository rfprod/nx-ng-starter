import { createAction, props } from '@ngrx/store';

import { featureName, IUserStateModel } from './user.interface';

const type = (name: string) => `[${featureName}] ${name}`;

const login = createAction(type('enable dark user'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

const logout = createAction(type('disable dark user'));

const signup = createAction(type('toggle user'), props<{ payload: Pick<IUserStateModel, 'email'> }>());

export const userActions = {
  login,
  logout,
  signup,
};
