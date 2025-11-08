import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { applicationIsFramed } from '@app/client-util-security';

import { AppDocModule } from './app/doc.module';
import { environment } from './environments/environment';

if (applicationIsFramed()) {
  console.error('It is forbidden to bootstrap the application in an iframe.');
} else {
  if (environment.production) {
    enableProdMode();
  }

  platformBrowser()
    .bootstrapModule(AppDocModule, { applicationProviders: [provideZoneChangeDetection()] })
    .catch(err => {
      console.error(err);
    });
}
