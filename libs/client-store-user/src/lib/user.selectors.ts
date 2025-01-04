import { createSelector } from '@ngrx/store';

import type { IUserState, IUserStateModel } from './user.interface';

const selectFeature = (state: IUserState) => state.user;

export const userSelector = {
  admin: createSelector(selectFeature, (state: IUserStateModel) => state.admin),
  email: createSelector(selectFeature, (state: IUserStateModel) => state.email),
  token: createSelector(selectFeature, (state: IUserStateModel) => state.token),
};
