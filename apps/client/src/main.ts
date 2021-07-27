import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeSentry } from '@app/client-services';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

initializeSentry(environment);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => {
    console.error(err);
  });
