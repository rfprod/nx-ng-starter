import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppChatbotState } from './chatbot.store';

@NgModule({
  imports: [NgxsModule.forFeature([AppChatbotState])],
})
export class AppChatbotStoreModule {}
