import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () => import('@app/client-diagnostics').then(mod => mod.AppClientDiagnosticsModule),
  },
  {
    path: 'chatbot',
    loadChildren: () => import('@app/client-chatbot').then(mod => mod.AppClientChatbotModule),
  },
  {
    path: '',
    outlet: 'sidebar',
    loadChildren: () => import('@app/client-sidebar').then(mod => mod.AppClientSidebarModule),
  },
  {
    path: '',
    outlet: 'chatbot',
    loadChildren: () => import('@app/client-chatbot').then(mod => mod.AppClientChatbotWidgetModule),
  },
  { path: '**', redirectTo: '' },
];

/**
 * Application routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
