import { NgModule } from '@angular/core';

import { AppHttpApiModule } from './http-api/http-api.module';
import { AppHttpProgressModule } from './http-progress/http-progress.module';
import { AppSidebarUiModule } from './sidebar-ui/sidebar-ui.module';
import { AppUserModule } from './user/user.module';
import { AppWebsocketModule } from './websocket/websocket.module';

@NgModule({
  imports: [
    AppHttpApiModule,
    AppHttpProgressModule,
    AppUserModule,
    AppSidebarUiModule,
    AppWebsocketModule,
  ],
  exports: [
    AppHttpApiModule,
    AppHttpProgressModule,
    AppUserModule,
    AppSidebarUiModule,
    AppWebsocketModule,
  ],
})
export class AppClientStoreModule {}
