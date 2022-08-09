export interface IUserStateModel {
  admin: boolean;
  email: string;
  token: string;
}

export interface IUserState {
  user: IUserStateModel;
}

export const featureName: keyof IUserState = 'user';
