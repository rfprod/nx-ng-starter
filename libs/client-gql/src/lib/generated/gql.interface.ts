export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type IScalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export interface IAppMatcompInputDto {
  description?: InputMaybe<IScalars['String']>;
  name?: InputMaybe<IScalars['String']>;
}

export interface IAppMatcompModel {
  __typename?: 'AppMatcompModel';
  creationDate: IScalars['Date'];
  description: IScalars['String'];
  id: IScalars['ID'];
  name: IScalars['String'];
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
  id: IScalars['String'];
};

export interface IQuery {
  __typename?: 'Query';
  matcomp: IAppMatcompModel;
  matcomps: Array<IAppMatcompModel>;
}


export type IQueryMatcompArgs = {
  id: IScalars['String'];
};


export type IQueryMatcompsArgs = {
  skip?: InputMaybe<IScalars['Int']>;
  take?: InputMaybe<IScalars['Int']>;
};

export interface ISubscription {
  __typename?: 'Subscription';
  matcompCreated: IAppMatcompModel;
  matcompRemoved: IAppMatcompModel;
}
