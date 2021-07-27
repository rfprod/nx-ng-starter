import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppClientMaterialModule } from '@app/client-material';

import { AppClientChatbotWidgetRoutingModule } from './client-chatbot-widget-routing.module';
import { AppChatbotWidgetRootComponent } from './components/chatbot-widget-root/chatbot-widget-root.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppClientMaterialModule, AppClientChatbotWidgetRoutingModule],
  declarations: [AppChatbotWidgetRootComponent],
})
export class AppClientChatbotWidgetModule {}
