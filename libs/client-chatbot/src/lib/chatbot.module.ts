import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDirectivesModule } from '@app/client-directives';
import { AppMaterialModule } from '@app/client-material';

import { AppChatbotRoutingModule } from './chatbot-routing.module';
import { AppChatbotRootComponent } from './components/chatbot-root/chatbot-root.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppMaterialModule, AppDirectivesModule, AppChatbotRoutingModule],
  declarations: [AppChatbotRootComponent],
})
export class AppChatbotModule {}
