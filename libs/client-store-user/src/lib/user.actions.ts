import { actionType } from '@app/client-util-ngrx';
import { createAction, props } from '@ngrx/store';

import { type IUserStateModel, userReducerConfig } from './user.interface';

export const userAction = {
  login: createAction(actionType(userReducerConfig.featureName, 'login'), props<{ payload: Pick<IUserStateModel, 'email'> }>()),
  logout: createAction(actionType(userReducerConfig.featureName, 'logout')),
  signup: createAction(actionType(userReducerConfig.featureName, 'signup'), props<{ payload: Pick<IUserStateModel, 'email'> }>()),
};
