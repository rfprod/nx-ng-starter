import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';

import { AppContentComponent } from './content/content.component';
import { AppNavbarComponent } from './navbar/navbar.component';
import { AppToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [FlexLayoutModule, CommonModule, AppClientMaterialModule, RouterModule],
  declarations: [AppContentComponent, AppNavbarComponent, AppToolbarComponent],
  exports: [AppContentComponent, AppNavbarComponent, AppToolbarComponent],
})
export class AppClientComponentsModule {}
