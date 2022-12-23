import { NgModule } from '@angular/core';
import { AppChatbotStoreModule } from '@app/client-store-chatbot';
import { AppFeatureAccessStoreModule } from '@app/client-store-feature-access';
import { AppHttpApiStoreModule } from '@app/client-store-http-api';
import { AppHttpProgressStoreModule } from '@app/client-store-http-progress';
import { AppSidebarStoreModule } from '@app/client-store-sidebar';
import { AppThemeStoreModule } from '@app/client-store-theme';
import { AppUserStoreModule } from '@app/client-store-user';

@NgModule({
  imports: [
    AppChatbotStoreModule.forRoot(),
    AppHttpApiStoreModule.forRoot(),
    AppHttpProgressStoreModule.forRoot(),
    AppSidebarStoreModule.forRoot(),
    AppThemeStoreModule.forRoot(),
    AppUserStoreModule.forRoot(),
    AppFeatureAccessStoreModule.forRoot(),
  ],
})
export class AppStoreModule {}
