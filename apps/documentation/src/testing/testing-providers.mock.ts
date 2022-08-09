import { Provider } from '@angular/core';
import { documentProvider, windowProvider } from '@app/client-util';

import { DOC_APP_ENV, IDocAppEnvironment } from '../app/interfaces/environment.interface';

export const testingEnvironment: IDocAppEnvironment = {
  appName: 'test',
  description: 'unit test',
  production: false,
  testing: true,
  meta: {
    version: 'N/A',
  },
  mdFilePaths: [],
};

export const testingProviders: Provider[] = [windowProvider, documentProvider, { provide: DOC_APP_ENV, useValue: testingEnvironment }];
