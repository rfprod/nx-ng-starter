import { NgModule } from '@angular/core';

import { AppHttpApiModule } from './state/http-api/http-api.module';
import { HttpProgressModule } from './state/http-progress/http-progress.module';
import { SidebarUiModule } from './state/sidebar-ui/sidebar-ui.module';
import { UserModule } from './state/user/user.module';

@NgModule({
  imports: [AppHttpApiModule, HttpProgressModule, UserModule, SidebarUiModule],
  exports: [AppHttpApiModule, HttpProgressModule, UserModule, SidebarUiModule],
})
export class SharedStoreModule {}
