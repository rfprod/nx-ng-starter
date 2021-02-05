import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule, Provider } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';

import { AppThemeService } from './theme.service';
import { AppThemeState } from './theme.store';

export const uiStoreModuleProviders: Provider[] = [AppThemeService];

@NgModule({
  imports: [MatSidenavModule, OverlayModule, NgxsModule.forFeature([AppThemeState])],
  providers: [],
})
export class AppThemeModule {}
