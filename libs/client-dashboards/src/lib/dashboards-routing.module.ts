import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppDashboardsComponent } from './components/dashboards/dashboards.component';

const routes: Route[] = [
  {
    path: '',
    component: AppDashboardsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDashboardsRoutingModule {}
