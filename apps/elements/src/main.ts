import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { applicationIsFramed } from '@app/client-util';
import { initializeSentry } from '@app/client-util-sentry';

import { AppElementsModule } from './app/elements.module';
import { environment } from './environments/environment';

if (applicationIsFramed()) {
  console.error('It is forbidden to bootstrap the application in an iframe.');
} else {
  if (environment.production) {
    enableProdMode();
  }

  /**
   * The elements app release identifier.
   */
  const clientReleaseId = `${environment.appName
    .split(' ')
    .map(item => item.toLowerCase())
    .join('-')}@${environment.meta.version}`;

  initializeSentry(environment, clientReleaseId);

  platformBrowserDynamic()
    .bootstrapModule(AppElementsModule)
    .catch(err => {
      console.error(err);
    });
}
