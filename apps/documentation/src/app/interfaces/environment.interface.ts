import { InjectionToken } from '@angular/core';

export interface IDocAppEnvironment {
  production: boolean;
  appName: string;
  mdFilePaths: string[];
}

export const DOC_APP_ENV = new InjectionToken<IDocAppEnvironment>('DOC_APP_ENV');
