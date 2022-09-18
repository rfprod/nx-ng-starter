import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppChatbotRootComponent } from './components/chatbot-root/chatbot-root.component';

const routes: Route[] = [
  {
    path: '',
    component: AppChatbotRootComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppChatbotRoutingModule {}
