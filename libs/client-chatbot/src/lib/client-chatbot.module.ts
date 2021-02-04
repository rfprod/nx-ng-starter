import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';

import { AppClientChatbotRoutingModule } from './client-chatbot-routing.module';
import { AppChatbotRootComponent } from './components/chatbot-root/chatbot-root.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppClientMaterialModule,
    AppClientChatbotRoutingModule,
  ],
  declarations: [AppChatbotRootComponent],
})
export class AppClientChatbotModule {}
