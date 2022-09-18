import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppAutoscrollDirective } from './autoscroll/autoscroll.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [AppAutoscrollDirective],
  exports: [AppAutoscrollDirective],
})
export class AppDirectivesModule {}
