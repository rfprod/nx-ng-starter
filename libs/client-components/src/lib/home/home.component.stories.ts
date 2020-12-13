import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppClientCoreModule } from '@nx-ng-starter/client-core';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import {
  AppHttpApiModule,
  AppHttpProgressModule,
  AppWebsocketModule,
} from '@nx-ng-starter/client-store';
import { AppClientTranslateModule } from '@nx-ng-starter/client-translate';

import { AppHomeComponent } from './home.component';
import { AppHomePage } from './page/home-page.component';

export default {
  title: 'AppHomeComponent',
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
    imports: [
      BrowserAnimationsModule,
      HttpClientModule,
      NgxsModule.forRoot([]),
      NgxsLoggerPluginModule.forRoot({ collapsed: true }),
      AppClientCoreModule.forRoot(testingEnvironment),
      AppClientMaterialModule.forRoot(),
      AppClientTranslateModule.forRoot(),
      AppHttpApiModule,
      AppHttpProgressModule.forRoot(),
      AppWebsocketModule.forRoot(testingEnvironment),
    ],
    declarations: [AppHomePage],
  },
  component: AppHomeComponent,
  props: {},
});
