export interface IElizaConfig {
  noRandom: boolean;
  capitalizeFirstLetter: boolean;
  debug: boolean;
  memSize: number;
}

export interface IElizaResponse {
  reply: string;
  final: boolean;
}

export type TElisaFinals = string[];

export type TElisaInitials = string[];

export type TElisaPosts = string[];

export type TElisaPres = string[];

export type TElisaQuits = string[];

export type TElisaSynonyms = Record<string, string[]>;

export interface IElizaKeywordRule {
  pattern: string;
  options: string[];
  memory: boolean;
}

export interface IElizaKeyword {
  index: number;
  key: string;
  rank: number;
  rules: IElizaKeywordRule[];
}

export interface IElisaPostTransform {
  searchValue: RegExp;
  replaceValue: string;
}

export interface IElizaData {
  initials: TElisaInitials;
  finals: TElisaFinals;
  quits: TElisaQuits;
  pres: TElisaPres;
  posts: TElisaPosts;
  synonyms: TElisaSynonyms;
  keywords: IElizaKeyword[];
  postTransforms: IElisaPostTransform[];
}
