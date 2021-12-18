import { DOCUMENT } from '@angular/common';
import { Provider } from '@angular/core';
import { documentFactory, WINDOW, windowFactory } from '@app/client-util';

import { DOC_APP_ENV, IDocAppEnvironment } from '../app/interfaces/environment.interface';

export const testingEnvironment: IDocAppEnvironment = {
  appName: 'test',
  description: 'unit test',
  mdFilePaths: [],
  production: false,
};

export const testingProviders: Provider[] = [
  { provide: WINDOW, useFactory: windowFactory },
  { provide: DOCUMENT, useFactory: documentFactory },
  { provide: DOC_APP_ENV, useValue: testingEnvironment },
];
