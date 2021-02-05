import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';

import { AppSidebarState } from './sidebar.store';

@NgModule({
  imports: [MatSidenavModule, NgxsModule.forFeature([AppSidebarState])],
})
export class AppSidebarModule {}
