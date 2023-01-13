import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppChatbotModule } from '@app/client-chatbot';
import { appCoreModuleProviders } from '@app/client-core';
import { AppElizaModule } from '@app/client-util-eliza';
import { sentryProviders } from '@app/client-util-sentry';

import { environment } from '../environments/environment';
import { AppElementsService } from './services/elements.service';

/**
 * The elements application module.
 */
@NgModule({
  imports: [BrowserAnimationsModule, AppElizaModule.forRoot(), AppChatbotModule],
  providers: [...appCoreModuleProviders(environment), ...sentryProviders(environment)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppElementsModule implements DoBootstrap {
  constructor(private readonly service: AppElementsService) {}

  public ngDoBootstrap() {
    this.service.registerElements();
  }
}
