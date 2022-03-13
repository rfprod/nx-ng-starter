import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppClientD3ChartsModule } from '@app/client-d3-charts';
import { AppClientMaterialModule } from '@app/client-material';

import { AppClientDiagnosticsRoutingModule } from './client-diagnostics-routing.module';
import { AppDiagnosticsHomeComponent } from './components/home/diagnostics-home.component';
import { AppDiagnosticsHomePage } from './components/home/page/diagnostics-home-page.component';
import { AppDiagnosticsIndexComponent } from './components/index/diagnostics-index.component';
import { AppDiagnosticsInfoComponent } from './components/info/diagnostics-info.component';
import { AppDiagnosticsInfoPage } from './components/info/page/diagnostics-info-page.component';

@NgModule({
  imports: [FlexLayoutModule, CommonModule, AppClientMaterialModule, AppClientDiagnosticsRoutingModule, AppClientD3ChartsModule],
  declarations: [
    AppDiagnosticsIndexComponent,
    AppDiagnosticsHomeComponent,
    AppDiagnosticsHomePage,
    AppDiagnosticsInfoComponent,
    AppDiagnosticsInfoPage,
  ],
})
export class AppClientDiagnosticsModule {}
