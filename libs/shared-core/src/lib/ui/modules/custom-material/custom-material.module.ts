import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

/**
 * Animations require hammerjs but it is bundled via angular.json.
 * use next line to import it here
 * import 'node_modules/hammerjs/hammer.js';
 */

import {
  // Form controls
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  // Navigation
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  // Layout
  MatGridListModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  // Buttons and indicators
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  // Popups and modals
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSliderModule,
  // Data table
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  // Misc
  MatTableModule,
  MatTabsModule,
  // Divider
  MatToolbarModule,
  // Icons
  MatTooltipDefaultOptions,
  // Tree
  MatTooltipModule,
  // Badge
  MatTreeModule,
} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

export function matTooltipDefaultOptions(): MatTooltipDefaultOptions {
  return {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
  };
}

/**
 * Module providers.
 */
export const customMaterialModuleProviders: Provider[] = [
  MatIconRegistry,
  {
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
    useFactory: matTooltipDefaultOptions,
  },
];

/**
 * Custom material module without providers.
 * Exports material modules only.
 */
@NgModule({
  imports: [
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
    MatTooltipModule,
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
  ],
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
    MatTooltipModule,
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
  ],
})
export class CustomMaterialModule {
  /**
   * Provides services.
   */
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CustomMaterialModule,
      providers: [...customMaterialModuleProviders],
    };
  }
}
