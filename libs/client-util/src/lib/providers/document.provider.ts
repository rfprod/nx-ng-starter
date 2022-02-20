import { DOCUMENT } from '@angular/common';
import { Provider } from '@angular/core';

export function documentFactory() {
  return window.document;
}

export const documentProvider: Provider = {
  provide: DOCUMENT,
  useFactory: documentFactory,
};
