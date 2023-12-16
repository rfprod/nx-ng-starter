import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AppGuidedTourComponent } from './components/guided-tour/guided-tour.component';
import { AppGuidedTourDirective } from './components/guided-tour/guided-tour.directive';
import { overlayProvider } from './providers/overlay.provider';

@NgModule({
  imports: [CommonModule, OverlayModule, MatButtonModule, MatIconModule, MatCardModule],
  declarations: [AppGuidedTourComponent, AppGuidedTourDirective],
  providers: [overlayProvider],
  exports: [AppGuidedTourDirective],
})
export class AppGuidedTourModule {}
