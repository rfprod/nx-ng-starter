import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppGuidedTourExampleComponent } from './components/guided-tour-example/guided-tour-example.component';
import { AppGuidedTourModule } from './guided-tour.module';
import { AppGuidedTourExampleRoutingModule } from './guided-tour-example-routing.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, AppGuidedTourModule, AppGuidedTourExampleRoutingModule],
  declarations: [AppGuidedTourExampleComponent],
})
export class AppGuidedTourExampleModule {}
