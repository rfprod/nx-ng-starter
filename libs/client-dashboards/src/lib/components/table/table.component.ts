import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IDashboardTableConfig } from '../../interfaces/table-config.interface';
import { AppTableBase } from '../_base/table/table.base';

export interface IPeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppTableComponent<T> extends AppTableBase<T> {
  @Input() public set config(config: IDashboardTableConfig<T>) {
    super.config = config;
  }

  constructor() {
    super();
  }

  public optionSelected(value: string): void {
    /**
     * @todo Implement this method.
     */
  }
}
