import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppHttpApiState } from './http-api.store';

@NgModule({
  imports: [NgxsModule.forFeature([AppHttpApiState])],
})
export class AppHttpApiModule {}
