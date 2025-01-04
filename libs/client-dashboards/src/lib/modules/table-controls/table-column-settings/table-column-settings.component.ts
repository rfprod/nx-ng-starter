import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { IDashboardTableConfig } from '../../../interfaces/table-config.interface';

@Component({
  selector: 'app-table-column-settings',
  templateUrl: './table-column-settings.component.html',
  styleUrls: ['./table-column-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppTableColumnSettingsComponent<T> {
  @Input() public columns: IDashboardTableConfig<T>['columns'] = [
    { name: 'one', order: 0 },
    { name: 'two', order: 1 },
  ];

  @Input() public displayedColumns: IDashboardTableConfig<T>['displayedColumns'] = [];

  @Output() public readonly columnVisibilityChange = new EventEmitter<IDashboardTableConfig<T>['columns']>();

  public changeVisibleColumns(event: MatSelectionListChange) {
    const value = event.source.selectedOptions.selected
      .map(item => item.value as IDashboardTableConfig<T>['columns']['0'])
      .sort((x, y) => x.order - y.order);
    this.columnVisibilityChange.emit(value);
  }
}
