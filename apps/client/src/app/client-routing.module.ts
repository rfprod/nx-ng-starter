import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

/**
 * The client application routes.
 */
export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@app/client-diagnostics').then(mod => mod.AppDiagnosticsModule),
  },
  {
    path: 'dashboards',
    loadChildren: () => import('@app/client-dashboards').then(mod => mod.AppDashboardsModule),
  },
  {
    path: 'chatbot',
    loadChildren: () => import('@app/client-chatbot').then(mod => mod.AppChatbotModule),
  },
  {
    path: '',
    outlet: 'sidebar',
    loadChildren: () => import('@app/client-sidebar').then(mod => mod.AppSidebarModule),
  },
  {
    path: '',
    outlet: 'chatbot',
    loadChildren: () => import('@app/client-chatbot').then(mod => mod.AppChatbotWidgetModule),
  },
  { path: '**', redirectTo: '' },
];

/**
 * The client application routing module.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppClientRoutingModule {}
