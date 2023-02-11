import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppChatbotModule } from '@app/client-chatbot';
import { AppElizaModule } from '@app/client-util-eliza';

@NgModule({
  imports: [CommonModule, AppElizaModule.forRoot(), AppChatbotModule],
})
export class AppElementsModule {}
