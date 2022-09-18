import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppChatbotWidgetRootComponent } from './components/chatbot-widget-root/chatbot-widget-root.component';

const routes: Route[] = [
  {
    path: 'root',
    component: AppChatbotWidgetRootComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppChatbotWidgetRoutingModule {}
