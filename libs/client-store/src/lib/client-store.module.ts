import { NgModule } from '@angular/core';
import { AppChatbotStoreModule } from '@app/client-store-chatbot';
import { AppSidebarStoreModule } from '@app/client-store-sidebar';
import { AppThemeStoreModule } from '@app/client-store-theme';
import { AppUserStoreModule } from '@app/client-store-user';

import { AppHttpApStoreModule } from './http-api/http-api.module';
import { AppHttpProgressStoreModule } from './http-progress/http-progress.module';

@NgModule({
  imports: [
    AppChatbotStoreModule,
    AppHttpApStoreModule,
    AppHttpProgressStoreModule.forRoot(),
    AppSidebarStoreModule,
    AppThemeStoreModule,
    AppUserStoreModule,
  ],
  exports: [
    AppChatbotStoreModule,
    AppHttpApStoreModule,
    AppHttpProgressStoreModule,
    AppSidebarStoreModule,
    AppThemeStoreModule,
    AppUserStoreModule,
  ],
})
export class AppClientStoreModule {}
