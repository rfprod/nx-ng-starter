import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppBarChartComponent } from './components/bar-chart/bar-chart.component';
import { AppChartExamplesComponent } from './components/chart-examples/chart-examples.component';
import { AppChartExamplesBarComponent } from './components/chart-examples-bar/chart-examples-bar.component';
import { AppChartExamplesForceDirectedComponent } from './components/chart-examples-force-directed/chart-examples-force-directed.component';
import { AppChartExamplesLineComponent } from './components/chart-examples-line/chart-examples-line.component';
import { AppChartExamplesPieComponent } from './components/chart-examples-pie/chart-examples-pie.component';
import { AppChartExamplesRadaraComponent } from './components/chart-examples-radar/chart-examples-radar.component';
import { AppForceDirectedChartComponent } from './components/force-directed-chart/force-directed-chart.component';
import { AppLineChartComponent } from './components/line-chart/line-chart.component';
import { AppPieChartComponent } from './components/pie-chart/pie-chart.component';
import { AppRadarChartComponent } from './components/radar-chart/radar-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    AppPieChartComponent,
    AppRadarChartComponent,
    AppForceDirectedChartComponent,
    AppBarChartComponent,
    AppLineChartComponent,
    AppChartExamplesComponent,
    AppChartExamplesLineComponent,
    AppChartExamplesRadaraComponent,
    AppChartExamplesBarComponent,
    AppChartExamplesPieComponent,
    AppChartExamplesForceDirectedComponent,
  ],
  exports: [
    AppPieChartComponent,
    AppRadarChartComponent,
    AppForceDirectedChartComponent,
    AppBarChartComponent,
    AppLineChartComponent,
    AppChartExamplesComponent,
  ],
})
export class AppD3ChartsModule {}
