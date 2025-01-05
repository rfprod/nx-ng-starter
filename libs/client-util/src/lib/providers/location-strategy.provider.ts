import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import type { Provider } from '@angular/core';

export const pathLocationStrategyProvider: Provider = {
  provide: LocationStrategy,
  useClass: PathLocationStrategy,
};
