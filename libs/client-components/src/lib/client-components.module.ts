import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';

import { AppClientComponentsRoutingModule } from './client-components-routing.module';
import { AppHomeComponent } from './home/home.component';
import { AppIndexComponent } from './index/index.component';
import { AppInfoComponent } from './info/info.component';
import { AppInfoPresentationalComponent } from './info/presentational/info-presentational.component';

@NgModule({
  imports: [CommonModule, AppClientMaterialModule, AppClientComponentsRoutingModule],
  declarations: [
    AppIndexComponent,
    AppHomeComponent,
    AppInfoComponent,
    AppInfoPresentationalComponent,
  ],
})
export class AppClientComponentsModule {}
