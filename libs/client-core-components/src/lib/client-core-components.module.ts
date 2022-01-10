import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AppClientMaterialModule } from '@app/client-material';

import { AppContentComponent } from './components/content/content.component';
import { AppNavbarComponent } from './components/navbar/navbar.component';
import { AppThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { AppToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [FlexLayoutModule, CommonModule, AppClientMaterialModule, RouterModule],
  declarations: [AppContentComponent, AppNavbarComponent, AppToolbarComponent, AppThemeToggleComponent],
  exports: [AppContentComponent, AppNavbarComponent, AppToolbarComponent, AppThemeToggleComponent],
})
export class AppClientCoreComponentsModule {}
