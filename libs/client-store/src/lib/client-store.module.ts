import { NgModule } from '@angular/core';

import { AppHttpApiModule } from './http-api/http-api.module';
import { AppHttpProgressModule } from './http-progress/http-progress.module';
import { AppSidebarUiModule } from './sidebar-ui/sidebar-ui.module';
import { AppUserModule } from './user/user.module';

@NgModule({
  imports: [AppHttpApiModule, AppHttpProgressModule, AppUserModule, AppSidebarUiModule],
  exports: [AppHttpApiModule, AppHttpProgressModule, AppUserModule, AppSidebarUiModule],
})
export class AppClientStoreModule {}
