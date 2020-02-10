export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface IScalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
}

export interface IMatcompModel {
   __typename?: 'MatcompModel';
  id: IScalars['ID'];
  name?: Maybe<IScalars['String']>;
  description?: Maybe<IScalars['String']>;
  creationDate?: Maybe<IScalars['Date']>;
}

export interface IMutation {
   __typename?: 'Mutation';
  create: IMatcompModel;
  remove: IScalars['Boolean'];
}

export interface IMutationCreateArgs {
  createMatcompInput: INewMatcompInputDto;
}

export interface IMutationRemoveArgs {
  id: IScalars['String'];
}

export interface INewFileUploadInputDto {
  filename: IScalars['String'];
  mimetype: IScalars['String'];
  encoding: IScalars['String'];
}

export interface INewMatcompInputDto {
  name: IScalars['String'];
  description: IScalars['String'];
}

export interface IQuery {
   __typename?: 'Query';
  matcomps: Array<IMatcompModel>;
  matcomp: IMatcompModel;
}

export interface IQueryMatcompsArgs {
  skip?: Maybe<IScalars['Int']>;
  take?: Maybe<IScalars['Int']>;
}

export interface IQueryMatcompArgs {
  id: IScalars['String'];
}

export interface ISubscription {
   __typename?: 'Subscription';
  matcompCreated: IMatcompModel;
  matcompRemoved: IMatcompModel;
}
