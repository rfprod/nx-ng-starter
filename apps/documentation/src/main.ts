import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { applicationIsFramed } from '@app/client-util';

import { AppDocModule } from './app/doc.module';
import { environment } from './environments/environment';

if (applicationIsFramed()) {
  console.error('It is forbidden to bootstrap the application in an iframe.');
} else {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowserDynamic()
    .bootstrapModule(AppDocModule)
    .catch(err => {
      console.error(err);
    });
}
