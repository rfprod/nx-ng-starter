import { NgModule } from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';

import { AppIndexComponent } from './components/app-index/app-index.component';

export const APP_ROUTES: Routes = [
  { path: 'index', component: AppIndexComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', redirectTo: 'index' }
];

/**
 * Application routing module.
 */
@NgModule({
  imports: [ RouterModule.forRoot(APP_ROUTES) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
