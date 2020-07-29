import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppHomeComponent } from './home/home.component';
import { AppIndexComponent } from './index/index.component';
import { AppInfoComponent } from './info/info.component';

/**
 * Application routes.
 */
export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: AppIndexComponent,
    children: [
      {
        path: '',
        component: AppHomeComponent,
      },
      {
        path: 'info',
        component: AppInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppClientComponentsRoutingModule {}
