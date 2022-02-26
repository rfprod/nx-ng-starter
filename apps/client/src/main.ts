import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { applicationIsFramed } from '@app/client-util';
import { initializeSentry } from '@app/client-util-sentry';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (applicationIsFramed()) {
  console.error('It is forbidden to bootstrap the application in an iframe.');
} else {
  if (environment.production) {
    enableProdMode();
  }

  initializeSentry(environment);

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => {
      console.error(err);
    });
}
