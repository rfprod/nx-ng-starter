import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppChartExamplesComponent } from '@app/client-d3-charts';

import { AppDiagnosticsHomeComponent } from './components/home/diagnostics-home.component';
import { AppDiagnosticsIndexComponent } from './components/index/diagnostics-index.component';
import { AppDiagnosticsInfoComponent } from './components/info/diagnostics-info.component';

const routes: Route[] = [
  {
    path: '',
    component: AppDiagnosticsIndexComponent,
    children: [
      {
        path: '',
        component: AppDiagnosticsHomeComponent,
      },
      {
        path: 'info',
        component: AppDiagnosticsInfoComponent,
        data: { feature: 'info', icon: 'api' },
      },
      {
        path: 'charts',
        component: AppChartExamplesComponent,
        data: { feature: 'chart examples', icon: 'show_chart' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDiagnosticsRoutingModule {}
