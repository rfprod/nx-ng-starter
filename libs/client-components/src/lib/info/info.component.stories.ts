import { HttpClientModule } from '@angular/common/http';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import { AppClientStoreModule, AppWebsocketModule } from '@nx-ng-starter/client-store';

import { AppInfoComponent } from './info.component';

export default {
  title: 'AppInfoComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      HttpClientModule,
      NgxsModule.forRoot([]),
      NgxsLoggerPluginModule.forRoot({ collapsed: true }),
      AppClientMaterialModule.forRoot(),
      AppClientStoreModule,
      AppWebsocketModule.forRoot({
        production: false,
        platform: '',
        appName: 'Nx Ng Starter Client',
        api: 'http://localhost:8080/api',
        envoyUrl: 'http://localhost:8081',
      }),
    ],
  },
  component: AppInfoComponent,
  props: {},
});
