import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppDashboardsComponent } from './components/dashboards/dashboards.component';
import { AppDashboardsGuard } from './guards/dashboards.guard';

const routes: Route[] = [
  {
    path: '',
    canActivate: [AppDashboardsGuard],
    component: AppDashboardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDashboardsRoutingModule {}
