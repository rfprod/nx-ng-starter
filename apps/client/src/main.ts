import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { applicationIsFramed } from '@app/client-util-security';
import { initializeSentry } from '@app/client-util-sentry';

import { AppClientModule } from './app/client.module';
import { environment } from './environments/environment';

if (applicationIsFramed()) {
  console.error('It is forbidden to bootstrap the application in an iframe.');
} else {
  if (environment.production) {
    enableProdMode();
  }

  /**
   * The client app release identifier.
   */
  const clientReleaseId = `${environment.appName
    .split(' ')
    .map(item => item.toLowerCase())
    .join('-')}@${environment.meta.version}`;

  initializeSentry(environment, clientReleaseId);

  platformBrowser()
    .bootstrapModule(AppClientModule, { applicationProviders: [provideZoneChangeDetection()] })
    .catch(err => {
      console.error(err);
    });
}
