import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppChatbotRootComponent } from './components/chatbot-root/chatbot-root.component';

export const CHATBOT_ROUTES: Route[] = [
  {
    path: 'root',
    component: AppChatbotRootComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(CHATBOT_ROUTES)],
  exports: [RouterModule],
})
export class AppClientChatbotRoutingModule {}
