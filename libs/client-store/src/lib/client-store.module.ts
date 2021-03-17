import { NgModule } from '@angular/core';

import { AppChatbotStoreModule } from './chatbot/chatbot.module';
import { AppHttpApStoreModule } from './http-api/http-api.module';
import { AppHttpProgressStoreModule } from './http-progress/http-progress.module';
import { AppSidebarStoreModule } from './sidebar/sidebar.module';
import { AppThemeStoreModule } from './theme/theme.module';
import { AppUserStoreModule } from './user/user.module';

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
