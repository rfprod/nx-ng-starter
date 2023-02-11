import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appCoreModuleProviders } from '@app/client-core';
import { AppElementsModule, AppElementsService } from '@app/client-elements';
import { sentryProviders } from '@app/client-util-sentry';

import { environment } from '../environments/environment';

/**
 * The elements application module.
 */
@NgModule({
  imports: [BrowserAnimationsModule, AppElementsModule],
  providers: [...appCoreModuleProviders(environment), ...sentryProviders(environment)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule implements DoBootstrap {
  constructor(private readonly service: AppElementsService) {}

  public ngDoBootstrap() {
    this.service.registerElements();
  }
}
