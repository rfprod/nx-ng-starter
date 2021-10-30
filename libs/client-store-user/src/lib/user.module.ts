import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppUserState } from './user.store';

@NgModule({
  imports: [NgxsModule.forFeature([AppUserState])],
})
export class AppUserStoreModule {}
