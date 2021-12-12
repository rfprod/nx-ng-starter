import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppChatbotState } from './chatbot.state';

@NgModule({
  imports: [NgxsModule.forFeature([AppChatbotState])],
})
export class AppChatbotStoreModule {}
