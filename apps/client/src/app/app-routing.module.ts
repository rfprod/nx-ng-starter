import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@nx-ng-starter/client-diagnostics').then(mod => mod.AppClientDiagnosticsModule),
  },
  {
    path: '',
    outlet: 'sidebar',
    loadChildren: () =>
      import('@nx-ng-starter/client-sidebar').then(mod => mod.AppClientSidebarModule),
  },
  {
    path: '',
    outlet: 'chatbot',
    loadChildren: () =>
      import('@nx-ng-starter/client-chatbot').then(mod => mod.AppClientChatbotModule),
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
