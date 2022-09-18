import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppSidebarRootComponent } from './components/sidebar-root/sidebar-root.component';

export const SIDEBAR_ROUTES: Route[] = [
  {
    path: 'root',
    component: AppSidebarRootComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(SIDEBAR_ROUTES)],
  exports: [RouterModule],
})
export class AppSidebarRoutingModule {}
