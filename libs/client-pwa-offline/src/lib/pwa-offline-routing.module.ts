import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppPwaOfflineComponent } from './components/pwa-offline/pwa-offline.component';

const routes: Route[] = [
  {
    path: 'offline',
    component: AppPwaOfflineComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPwaOfflineRoutingModule {}
