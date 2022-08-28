import { Provider } from '@angular/core';
import { documentProvider, windowProvider } from '@app/client-util';

import { DOCUMENTATION_ENVIRONMENT, IDocumentationEnvironment } from '../app/interfaces/environment.interface';

export const testingEnvironment: IDocumentationEnvironment = {
  appName: 'test',
  description: 'unit test',
  production: false,
  testing: true,
  meta: {
    version: 'N/A',
  },
  mdFilePaths: [],
};

export const testingProviders: Provider[] = [
  windowProvider,
  documentProvider,
  { provide: DOCUMENTATION_ENVIRONMENT, useValue: testingEnvironment },
];
