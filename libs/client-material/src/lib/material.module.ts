import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HammerModule } from '@angular/platform-browser';

import { appMaterialModuleProviders } from './providers/material-module.providers';

/**
 * Shared application material module.
 */
@NgModule({
  exports: [
    // Form controls
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatRadioModule,
    // Navigation
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    // Layout
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    // Buttons and indicators
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    // Popups and modals
    MatDialogModule,
    MatSnackBarModule,
    // MatTooltipModule, // there is a custom light weight tooltip implemented instead of this one
    // Data table
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    // Misc
    MatOptionModule,
    MatRippleModule,
    // Divider
    MatDividerModule,
    // Tree
    MatTreeModule,
    // Badge
    MatBadgeModule,
    // Cdk
    OverlayModule,
    HammerModule,
  ],
})
export class AppMaterialModule {
  /**
   * Provides services.
   */
  public static forRoot(): ModuleWithProviders<AppMaterialModule> {
    return {
      ngModule: AppMaterialModule,
      providers: [...appMaterialModuleProviders],
    };
  }
}
