import { InjectionToken } from '@angular/core';

export interface IDocumentationEnvironment {
  production: boolean;
  testing: boolean;
  appName: string;
  description: string;
  meta: {
    version: string;
  };
  mdFilePaths: string[];
}

export const DOCUMENTATION_ENVIRONMENT = new InjectionToken<IDocumentationEnvironment>('DOCUMENTATION_ENVIRONMENT');
