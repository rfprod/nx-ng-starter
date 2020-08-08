import { RouterModule } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';
import { AppClientStoreModule, AppWebsocketModule } from '@nx-ng-starter/client-store';

import { AppIndexComponent } from './index.component';

export default {
  title: 'AppIndexComponent',
};

export const primary = () => ({
  moduleMetadata: {
    imports: [
      RouterModule,
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
  component: AppIndexComponent,
  props: {},
});
