import 'node_modules/hammerjs/hammer.js';

import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateAdapterOptions,
  MatMomentDateModule,
} from '@angular/material-moment-adapter';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatOptionModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
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
import {
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions,
  MatTooltipModule,
} from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

/**
 * Animations require hammerjs but it is bundled via angular.json.
 * use next line to import it here
 * import 'node_modules/hammerjs/hammer.js';
 */

export function matTooltipOptions(): MatTooltipDefaultOptions {
  return {
    showDelay: 1000,
    hideDelay: 1000,
    touchendHideDelay: 1000,
  };
}

/**
 * Material moment date adapter options factory.
 */
export function matMomentDateAdapterOptionsFactory(): MatMomentDateAdapterOptions {
  return {
    useUtc: false,
  };
}

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

/**
 * Module providers.
 */
export const customMaterialModuleProviders: Provider[] = [
  MatIconRegistry,
  {
    provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
    useFactory: matTooltipOptions,
  },
  {
    provide: MAT_DATE_LOCALE,
    useValue: 'en',
  },
  {
    provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    useFactory: matMomentDateAdapterOptionsFactory,
  },
  { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
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
  public static forRoot(): ModuleWithProviders<CustomMaterialModule> {
    return {
      ngModule: CustomMaterialModule,
      providers: [...customMaterialModuleProviders],
    };
  }
}
