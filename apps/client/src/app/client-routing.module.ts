import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppFeatureAccessGuard, AppFeatureAccessInitGuard } from '@app/client-store-feature-access';

/**
 * The client application routes.
 */
export const routes: Route[] = [
  {
    path: '',
    canActivate: [AppFeatureAccessInitGuard],
    data: { feature: 'home', title: 'Home', icon: 'home' },
    loadChildren: () => import('@app/client-diagnostics').then(mod => mod.AppDiagnosticsModule),
  },
  {
    path: 'dashboards',
    canActivate: [AppFeatureAccessInitGuard, AppFeatureAccessGuard],
    data: { feature: 'dashboards', title: 'Dashboards', icon: 'dashboard' },
    loadChildren: () => import('@app/client-dashboards').then(mod => mod.AppDashboardsModule),
  },
  {
    path: 'chatbot',
    canActivate: [AppFeatureAccessInitGuard],
    data: { feature: 'chatbot', title: 'Chatbot', icon: 'chat' },
    loadChildren: () => import('@app/client-chatbot').then(mod => mod.AppChatbotModule),
  },
  {
    path: 'guided-tour',
    data: { feature: 'guided-tour', title: 'Guided Tour', icon: 'tour' },
    loadChildren: () => import('@app/client-guided-tour').then(mod => mod.AppGuidedTourExampleModule),
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
    }),
  ],
  exports: [RouterModule],
})
export class AppClientRoutingModule {}
