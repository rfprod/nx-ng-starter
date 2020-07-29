import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@nx-ng-starter/client-components').then(mod => mod.AppClientComponentsModule),
  },
  { path: '**', redirectTo: '' },
];

/**
 * Application routing module.
 */
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
