import { NgModule } from '@angular/core';

import { Route, RouterModule } from '@angular/router';

import { AppIndexComponent } from './components/app-index/app-index.component';

import { AppIndexApiComponent } from './components/app-index/api/app-index-api.component';

import { AppIndexHomeComponent } from './components/app-index/home/app-index-home.component';

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
        path: 'api-info',
        component: AppIndexApiComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
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
