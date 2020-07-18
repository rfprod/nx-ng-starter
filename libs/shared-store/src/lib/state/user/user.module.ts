import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { userServiceProvider } from './user.service';
import { AppUserState } from './user.store';

export const userModuleProviders: Provider[] = [userServiceProvider];

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([AppUserState])],
  providers: [...userModuleProviders],
})
export class AppUserModule {
  public static forRoot(): ModuleWithProviders<AppUserModule> {
    return {
      ngModule: AppUserModule,
      providers: [...userModuleProviders],
    };
  }
}
