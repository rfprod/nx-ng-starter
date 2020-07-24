import { NgModule } from '@angular/core';

import { AppHttpApiModule } from './state/http-api/http-api.module';
import { AppHttpProgressModule } from './state/http-progress/http-progress.module';
import { AppSidebarUiModule } from './state/sidebar-ui/sidebar-ui.module';
import { AppUserModule } from './state/user/user.module';

@NgModule({
  imports: [AppHttpApiModule, AppHttpProgressModule, AppUserModule, AppSidebarUiModule],
  exports: [AppHttpApiModule, AppHttpProgressModule, AppUserModule, AppSidebarUiModule],
})
export class AppSharedStoreModule {}
