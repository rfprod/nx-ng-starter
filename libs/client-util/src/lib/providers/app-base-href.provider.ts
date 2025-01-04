import { APP_BASE_HREF } from '@angular/common';
import type { Provider } from '@angular/core';

export const appBaseHrefProvider: Provider = {
  provide: APP_BASE_HREF,
  useValue: '/',
};
