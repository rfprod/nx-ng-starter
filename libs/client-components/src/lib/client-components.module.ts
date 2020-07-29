import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';

import { AppClientComponentsRoutingModule } from './client-components-routing.module';
import { AppHomeComponent } from './home/home.component';
import { AppIndexComponent } from './index/index.component';
import { AppInfoComponent } from './info/info.component';

@NgModule({
  imports: [CommonModule, AppClientMaterialModule, AppClientComponentsRoutingModule],
  declarations: [AppIndexComponent, AppHomeComponent, AppInfoComponent],
})
export class AppClientComponentsModule {}
