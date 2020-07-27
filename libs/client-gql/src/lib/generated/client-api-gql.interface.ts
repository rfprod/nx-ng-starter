import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
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



export interface IQuery {
  __typename?: 'Query';
  matcomps: Array<IMatcompModel>;
  matcomp: IMatcompModel;
}


export type IQueryMatcompsArgs = {
  skip?: Maybe<IScalars['Int']>;
  take?: Maybe<IScalars['Int']>;
};


export type IQueryMatcompArgs = {
  id: IScalars['String'];
};

export interface IMatcompModel {
  __typename?: 'MatcompModel';
  id: IScalars['ID'];
  name: IScalars['String'];
  description: IScalars['String'];
  creationDate: IScalars['Date'];
}


export interface IMutation {
  __typename?: 'Mutation';
  create: IMatcompModel;
  remove: IScalars['Boolean'];
}


export type IMutationCreateArgs = {
  input: INewMatcompInputDto;
};


export type IMutationRemoveArgs = {
  id: IScalars['String'];
};

export interface INewMatcompInputDto {
  name?: Maybe<IScalars['String']>;
  description?: Maybe<IScalars['String']>;
}

export interface ISubscription {
  __typename?: 'Subscription';
  matcompCreated: IMatcompModel;
  matcompRemoved: IMatcompModel;
}


