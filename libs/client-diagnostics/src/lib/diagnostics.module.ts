import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AppD3ChartsModule } from '@app/client-d3-charts';

import { AppDiagnosticsHomeComponent } from './components/home/diagnostics-home.component';
import { AppDiagnosticsHomePage } from './components/home/page/diagnostics-home-page.component';
import { AppDiagnosticsIndexComponent } from './components/index/diagnostics-index.component';
import { AppDiagnosticsInfoComponent } from './components/info/diagnostics-info.component';
import { AppDiagnosticsInfoPage } from './components/info/page/diagnostics-info-page.component';
import { AppDiagnosticsRoutingModule } from './diagnostics-routing.module';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, AppDiagnosticsRoutingModule, AppD3ChartsModule],
  declarations: [
    AppDiagnosticsIndexComponent,
    AppDiagnosticsHomeComponent,
    AppDiagnosticsHomePage,
    AppDiagnosticsInfoComponent,
    AppDiagnosticsInfoPage,
  ],
})
export class AppDiagnosticsModule {}
