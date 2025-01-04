import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IDashboardTableConfig } from '../../interfaces/table-config.interface';

interface ITableData {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppDashboardsComponent {
  public readonly tableConfig: IDashboardTableConfig<ITableData> = {
    columns: [
      { name: 'controls', order: 0 },
      { name: 'position', order: 1 },
      { name: 'name', order: 2 },
      { name: 'weight', order: 3 },
      { name: 'symbol', order: 4 },
    ],
    displayedColumns: ['controls', 'position', 'name', 'weight', 'symbol'],
    data: [
      { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
      { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
      { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
      { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
      { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
      { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
      { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
      { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
      { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
      { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    ],
    options: [{ icon: 'unfold_more', value: 'expand', title: 'Expand' }],
  };
}
