import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';

import { SidebarUiService } from './sidebar-ui.service';
import { SidebarUiState } from './sidebar-ui.store';

export const sidebarUiModuleProviders: Provider[] = [SidebarUiService];

@NgModule({
  imports: [MatSidenavModule, NgxsModule.forFeature([SidebarUiState])],
  providers: [...sidebarUiModuleProviders],
})
export class SidebarUiModule {
  public static forRoot(): ModuleWithProviders<SidebarUiModule> {
    return {
      ngModule: SidebarUiModule,
      providers: [...sidebarUiModuleProviders],
    };
  }
}
