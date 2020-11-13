import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppDocMarkdownReferenceComponent } from './componenets/md-reference/md-reference.component';

/**
 * Application routes.
 */
export const DOC_APP_ROUTES: Array<Route> = [
  {
    path: '',
    component: AppDocMarkdownReferenceComponent,
  },
  { path: '**', redirectTo: '' },
];

/**
 * Documentation application routing module.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(DOC_APP_ROUTES, {
      initialNavigation: 'enabled',
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppDocRoutingModule {}
