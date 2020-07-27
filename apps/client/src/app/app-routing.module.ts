import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppIndexApiComponent } from './components/app-index/api/app-index-api.component';
import { AppIndexHomeComponent } from './components/app-index/home/app-index-home.component';
import { AppIndexComponent } from './components/app-index/index/app-index.component';

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
        component: AppIndexHomeComponent,
      },
      {
        path: 'info',
        component: AppIndexApiComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

/**
 * Application routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
