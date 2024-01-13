export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type IScalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: { input: any; output: any; }
};

export interface IAppMatcompInputDto {
  description?: IScalars['String']['input'];
  name?: IScalars['String']['input'];
}

export interface IAppMatcompModel {
  __typename?: 'AppMatcompModel';
  creationDate: IScalars['Timestamp']['output'];
  description: IScalars['String']['output'];
  id: IScalars['ID']['output'];
  name: IScalars['String']['output'];
}

export interface IMutation {
  __typename?: 'Mutation';
  create: IAppMatcompModel;
  remove: IAppMatcompModel;
}


export type IMutationCreateArgs = {
  input: IAppMatcompInputDto;
};


export type IMutationRemoveArgs = {
  id: IScalars['String']['input'];
};

export interface IQuery {
  __typename?: 'Query';
  matcomp: IAppMatcompModel;
  matcomps: Array<IAppMatcompModel>;
}


export type IQueryMatcompArgs = {
  id: IScalars['String']['input'];
};


export type IQueryMatcompsArgs = {
  skip?: IScalars['Int']['input'];
  take?: IScalars['Int']['input'];
};

export interface ISubscription {
  __typename?: 'Subscription';
  matcompCreated: IAppMatcompModel;
  matcompRemoved: IAppMatcompModel;
}
