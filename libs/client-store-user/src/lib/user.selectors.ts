import { createSelector } from '@ngrx/store';

import { IUserState, IUserStateModel } from './user.interface';

const selectFeature = (state: IUserState) => state.user;

const admin = createSelector(selectFeature, (state: IUserStateModel) => state.admin);
const email = createSelector(selectFeature, (state: IUserStateModel) => state.email);
const token = createSelector(selectFeature, (state: IUserStateModel) => state.token);

export const userSelectors = {
  admin,
  email,
  token,
};
