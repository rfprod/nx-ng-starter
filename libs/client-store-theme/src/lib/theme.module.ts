import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';

import { AppThemeState } from './theme.store';

@NgModule({
  imports: [MatSidenavModule, OverlayModule, NgxsModule.forFeature([AppThemeState])],
})
export class AppThemeStoreModule {}
