import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppAutoscrollDirective } from './autoscroll/autoscroll.directive';
import { AppFullScreenDirective } from './full-screen/full-screen.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AppAutoscrollDirective, AppFullScreenDirective],
  exports: [AppAutoscrollDirective, AppFullScreenDirective],
})
export class AppDirectivesModule {}
