import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';

import { AppSidebarUiState } from './sidebar-ui.store';

@NgModule({
  imports: [MatSidenavModule, NgxsModule.forFeature([AppSidebarUiState])],
})
export class AppSidebarUiModule {}
