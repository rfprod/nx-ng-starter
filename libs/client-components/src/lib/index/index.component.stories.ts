import { RouterModule } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppClientCoreModule } from '@nx-ng-starter/client-core';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import { AppClientServicesModule } from '@nx-ng-starter/client-services';
import { AppClientStoreModule, AppWebsocketModule } from '@nx-ng-starter/client-store';
import { AppIndexComponent } from './index.component';

export default {
  title: 'AppIndexComponent',
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
      RouterModule.forRoot([]),
      NgxsModule.forRoot([]),
      NgxsLoggerPluginModule.forRoot({ collapsed: true }),
      AppClientCoreModule.forRoot(testingEnvironment),
      AppClientMaterialModule.forRoot(),
      AppClientStoreModule,
      AppClientServicesModule.forRoot(),

      AppWebsocketModule.forRoot({
        production: false,
        platform: '',
        appName: 'Nx Ng Starter Client',
        api: 'http://localhost:8080/api',
        envoyUrl: 'http://localhost:8081',
      }),
    ],
  },
  component: AppIndexComponent,
  props: {},
});
