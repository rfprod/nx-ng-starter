import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppDocMarkdownReferenceComponent } from './componenets/md-reference/md-reference.component';

/**
 * The documentation application routes.
 */
export const routes: Array<Route> = [
  {
    path: '',
    component: AppDocMarkdownReferenceComponent,
  },
  { path: '**', redirectTo: '' },
];

/**
 * The documentation application routing module.
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppDocRoutingModule {}
