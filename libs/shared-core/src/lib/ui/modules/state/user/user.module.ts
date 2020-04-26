import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { userServiceProvider } from './user.service';
import { UserState } from './user.store';

export const userModuleProviders: Provider[] = [userServiceProvider];

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([UserState])],
  providers: [...userModuleProviders],
})
export class UserModule {
  public static forRoot(): ModuleWithProviders<UserModule> {
    return {
      ngModule: UserModule,
      providers: [...userModuleProviders],
    };
  }
}
