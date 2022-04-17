export interface IUserName {
  first: string;
  last: string;
}

export interface IUser {
  id: string;
  name: IUserName;
  token: string;
}

export interface IUserLoginCredentials {
  email: string;
  password: string;
}

export interface IUserLogoutCredentials {
  token: string;
}
