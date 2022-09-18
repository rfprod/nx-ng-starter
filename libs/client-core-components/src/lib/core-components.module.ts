import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '@app/client-material';

import { AppContentComponent } from './components/content/content.component';
import { AppNavbarComponent } from './components/navbar/navbar.component';
import { AppThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { AppToolbarComponent } from './components/toolbar/toolbar.component';
import { AppTooltipComponent } from './components/tooltip/tooltip.component';
import { AppTooltipDirective } from './components/tooltip/tooltip.directive';

@NgModule({
  imports: [FlexLayoutModule, CommonModule, AppMaterialModule, RouterModule],
  declarations: [
    AppContentComponent,
    AppNavbarComponent,
    AppToolbarComponent,
    AppThemeToggleComponent,
    AppTooltipComponent,
    AppTooltipDirective,
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
