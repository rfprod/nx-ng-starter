import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * The client application routes.
 */
export const routes: Route[] = [
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
 * The client application routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppClientRoutingModule {}
