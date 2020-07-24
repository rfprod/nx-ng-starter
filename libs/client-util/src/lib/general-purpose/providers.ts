import { DOCUMENT } from '@angular/common';
import { Provider } from '@angular/core';

import { documentFactory, windowFactory } from './factories';
import { WINDOW } from './injection-tokens';

export const windowProvider: Provider = {
  provide: WINDOW,
  useFactory: windowFactory,
};

export const documentProvider: Provider = {
  provide: DOCUMENT,
  useFactory: documentFactory,
};
