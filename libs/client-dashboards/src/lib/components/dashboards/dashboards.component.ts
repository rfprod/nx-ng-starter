import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDashboardsComponent {}
