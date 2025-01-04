import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IDashboardTableConfig } from '../../../interfaces/table-config.interface';

@Component({
  selector: 'app-table-row-menu',
  templateUrl: './table-row-menu.component.html',
  styleUrls: ['./table-row-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppTableRowMenuComponent<T> {
  @Input() public options: IDashboardTableConfig<T>['options'] = [{ icon: 'unfold_more', value: 'expand', title: 'Expand' }];

  @Output() public readonly optionSelected = new EventEmitter<string>();

  public selectionChange(value: string) {
    this.optionSelected.emit(value);
  }
}
