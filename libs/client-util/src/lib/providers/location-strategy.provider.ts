import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Provider } from '@angular/core';

export const pathLocationStrategyProvider: Provider = {
  provide: LocationStrategy,
  useClass: PathLocationStrategy,
};
