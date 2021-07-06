import { DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import { documentFactory, WEB_CLIENT_APP_ENV, WINDOW, windowFactory } from '@nx-ng-starter/client-util';
import { Args, Story } from '@storybook/angular/types-6-0';

import { AppDiagnosticsInfoPage } from './diagnostics-info-page.component';

export default {
  title: 'AppDiagnosticsInfoPage',
};

const testingEnvironment = {
  production: false,
  platform: '',
  appName: 'Nx Ng Starter Client',
  api: 'http://localhost:8080/api',
  envoyUrl: 'http://localhost:8081',
};

const story: Story<AppDiagnosticsInfoPage> = (args: Args) => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, FlexLayoutModule, AppClientMaterialModule.forRoot()],
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
  },
  component: AppDiagnosticsInfoPage,
  props: {
    ...args,
  },
});

export const primary = story.bind({});
primary.args = {
  ping: 'ping result',
  markedInstructions: 'Marked instructions',
};
