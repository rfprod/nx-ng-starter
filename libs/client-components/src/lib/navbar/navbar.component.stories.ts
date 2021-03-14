import { APP_BASE_HREF, DOCUMENT, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import {
  documentFactory,
  WEB_CLIENT_APP_ENV,
  WINDOW,
  windowFactory,
} from '@nx-ng-starter/client-util';
import { text } from '@storybook/addon-knobs';

import { AppNavbarComponent } from './navbar.component';

export default {
  title: 'AppNavbarComponent',
};

const testingEnvironment = {
  production: false,
  platform: '',
  appName: 'Nx Ng Starter Client',
  api: 'http://localhost:8080/api',
  envoyUrl: 'http://localhost:8081',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [BrowserAnimationsModule, FlexLayoutModule, AppClientMaterialModule.forRoot()],
    providers: [
      {
        provide: LocationStrategy,
        useClass: PathLocationStrategy,
      },
      { provide: WINDOW, useFactory: windowFactory },
      { provide: DOCUMENT, useFactory: documentFactory },
      { provide: APP_BASE_HREF, useValue: '/' },
      {
        provide: WEB_CLIENT_APP_ENV,
        useValue: testingEnvironment,
      },
    ],
  },
  component: AppNavbarComponent,
  props: {
    ping: text('ping', 'ping result'),
    markedInstructions: text('Marked Instructions', 'Marked instructions'),
  },
});
