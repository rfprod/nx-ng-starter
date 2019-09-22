import { NgModule } from '@angular/core';

import {
  Route,
  RouterModule
} from '@angular/router';

import { AppIndexComponent } from './components/app-index/app-index.component';

/**
 * Application routes.
 */
export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: AppIndexComponent,
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
  imports: [ RouterModule.forRoot(APP_ROUTES) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
