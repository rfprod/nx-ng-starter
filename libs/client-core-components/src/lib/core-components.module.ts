import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '@app/client-material';
import { AppFeatureAccessDirectivesModule } from '@app/client-store-feature-access';

import { AppContentComponent } from './components/content/content.component';
import { AppNavbarComponent } from './components/navbar/navbar.component';
import { AppNavigatorComponent } from './components/navigator/navigator.component';
import { AppSearchComponent } from './components/search/search.component';
import { AppThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { AppToolbarComponent } from './components/toolbar/toolbar.component';
import { AppTooltipComponent } from './components/tooltip/tooltip.component';
import { AppTooltipDirective } from './components/tooltip/tooltip.directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppMaterialModule, RouterModule, AppFeatureAccessDirectivesModule],
  declarations: [
    AppContentComponent,
    AppNavigatorComponent,
    AppNavbarComponent,
    AppToolbarComponent,
    AppThemeToggleComponent,
    AppTooltipComponent,
    AppTooltipDirective,
    AppSearchComponent,
  ],
  exports: [
    AppContentComponent,
    AppNavbarComponent,
    AppToolbarComponent,
    AppThemeToggleComponent,
    AppTooltipComponent,
    AppTooltipDirective,
  ],
})
export class AppCoreComponentsModule {}
