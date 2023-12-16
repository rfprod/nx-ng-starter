import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { AppGuidedTourExampleComponent } from './components/guided-tour-example/guided-tour-example.component';

const routes: Route[] = [
  {
    path: '',
    component: AppGuidedTourExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppGuidedTourExampleRoutingModule {}
