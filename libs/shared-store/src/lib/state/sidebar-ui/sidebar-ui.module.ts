import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxsModule } from '@ngxs/store';

import { AppSidebarUiService } from './sidebar-ui.service';
import { AppSidebarUiState } from './sidebar-ui.store';

export const sidebarUiModuleProviders: Provider[] = [AppSidebarUiService];

@NgModule({
  imports: [MatSidenavModule, NgxsModule.forFeature([AppSidebarUiState])],
  providers: [...sidebarUiModuleProviders],
})
export class AppSidebarUiModule {
  public static forRoot(): ModuleWithProviders<AppSidebarUiModule> {
    return {
      ngModule: AppSidebarUiModule,
      providers: [...sidebarUiModuleProviders],
    };
  }
}
