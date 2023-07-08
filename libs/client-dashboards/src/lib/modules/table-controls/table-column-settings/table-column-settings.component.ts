import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-table-column-settings',
  templateUrl: './table-column-settings.component.html',
  styleUrls: ['./table-column-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableColumnSettingsComponent {
  @Input() public allColumns: string[] = ['one', 'two'];

  @Input() public displayedColumns: string[] = [];

  @Output() public readonly columnVisibilityChange = new EventEmitter<string[]>();

  public changeVisibleColumns(event: MatSelectionListChange) {
    const value = event.source.selectedOptions.selected.map(item => <string>item.value);
    this.columnVisibilityChange.emit(value);
  }
}
