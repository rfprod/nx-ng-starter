import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDirectivesModule } from '@app/client-directives';
import { AppMaterialModule } from '@app/client-material';

import { AppChatbotWidgetRoutingModule } from './chatbot-widget-routing.module';
import { AppChatbotWidgetRootComponent } from './components/chatbot-widget-root/chatbot-widget-root.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppMaterialModule, AppDirectivesModule, AppChatbotWidgetRoutingModule],
  declarations: [AppChatbotWidgetRootComponent],
})
export class AppChatbotWidgetModule {}
