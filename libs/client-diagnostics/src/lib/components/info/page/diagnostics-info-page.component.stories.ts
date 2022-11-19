import { DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '@app/client-material';
import { documentFactory, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@app/client-util';
import { Args, Story } from '@storybook/angular/types-6-0';

import { AppDiagnosticsInfoPage } from './diagnostics-info-page.component';

const testingEnvironment = {
  production: false,
  platform: '',
  appName: 'Nx Ng Starter Client',
  api: 'http://localhost:8080/api',
  envoyUrl: 'http://localhost:8081',
};

export default {
  title: 'AppDiagnosticsInfoPage',
  component: AppDiagnosticsInfoPage,
};

const story: Story<AppDiagnosticsInfoPage> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, AppMaterialModule.forRoot()],
    providers: [
      {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
      },
      { provide: WINDOW, useFactory: windowFactory },
      { provide: DOCUMENT, useFactory: documentFactory },
      {
        provide: WEB_CLIENT_APP_ENV,
        useValue: testingEnvironment,
      },
    ],
    declarations: [AppDiagnosticsInfoPage],
  },
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  ping: 'ping result',
  markedInstructions: 'Marked instructions',
};
primary.parameters = {
  /**
   * Use legacy Angular renderer.
   * See docs https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#new-angular-renderer
   */
  // angularLegacyRendering: true,
};
