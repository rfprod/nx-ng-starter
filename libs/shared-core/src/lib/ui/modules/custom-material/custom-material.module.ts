import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  // form controls
  MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatRadioModule,
  // navigation
  MatMenuModule, MatSidenavModule, MatToolbarModule,
  // layout
  MatListModule, MatGridListModule, MatCardModule, MatStepperModule, MatTabsModule, MatExpansionModule,
  // buttons and indicators
  MatButtonModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule,
  // popups and modals
  MatDialogModule, MatSnackBarModule, MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions,
  // data table
  MatTableModule, MatSortModule, MatPaginatorModule,
  // misc
  MatOptionModule, MatRippleModule,
  // divider
  MatDividerModule,
  // icons
  MatIconRegistry,
  // tree
  MatTreeModule,
  // badge
  MatBadgeModule

} from '@angular/material';

import { OverlayModule } from '@angular/cdk/overlay';

import { MatMomentDateModule } from '@angular/material-moment-adapter';

/**
 * Custom material module without providers.
 * Exports material modules only.
 */
@NgModule({
  imports: [
    // form controls
    MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatMomentDateModule, MatInputModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatRadioModule,
    // navigation
    MatMenuModule, MatSidenavModule, MatToolbarModule,
    // layout
    MatListModule, MatGridListModule, MatCardModule, MatStepperModule, MatTabsModule, MatExpansionModule,
    // buttons and indicators
    MatButtonModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule,
    // popups and modals
    MatDialogModule, MatSnackBarModule, MatTooltipModule,
    // data table
    MatTableModule, MatSortModule, MatPaginatorModule,
    // misc
    MatOptionModule, MatRippleModule,
    // divider
    MatDividerModule,
    // tree
    MatTreeModule,
    // badge
    MatBadgeModule,
    // cdk
    OverlayModule
  ],
  exports: [
    // form controls
    MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatMomentDateModule, MatInputModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatRadioModule,
    // navigation
    MatMenuModule, MatSidenavModule, MatToolbarModule,
    // layout
    MatListModule, MatGridListModule, MatCardModule, MatStepperModule, MatTabsModule, MatExpansionModule,
    // buttons and indicators
    MatButtonModule, MatButtonToggleModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule,
    // popups and modals
    MatDialogModule, MatSnackBarModule, MatTooltipModule,
    // data table
    MatTableModule, MatSortModule, MatPaginatorModule,
    // misc
    MatOptionModule, MatRippleModule,
    // divider
    MatDividerModule,
    // tree
    MatTreeModule,
    // badge
    MatBadgeModule,
    // cdk
    OverlayModule
  ]
})
export class CustomMaterialModule {}

/**
 * Custom material module with providers.
 * Exports material modules, and provides services.
 */
export const CustomMaterialModuleWithProviders: ModuleWithProviders = {
  ngModule: CustomMaterialModule,
  providers: [
    MatIconRegistry,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 1000, hideDelay: 1000, touchendHideDelay: 1000 } as MatTooltipDefaultOptions }
  ]
};
