import { signal } from '@angular/core';

import type { IDashboardTableConfig } from '../../../interfaces/table-config.interface';

/** Base class for table components. */
export abstract class AppTableBase<T> {
  /** Configuration of the table. */
  public set config(config: IDashboardTableConfig<T>) {
    this.columns.set(config.columns);
    this.displayedColumns.set(config.displayedColumns);
    this.dataSource.set(config.data);
    this.options.set(config.options);
  }

  /** All table columns. */
  public columns = signal<IDashboardTableConfig<T>['columns']>([]);

  /** Displayed tale columns. */
  public displayedColumns = signal<IDashboardTableConfig<T>['displayedColumns']>(this.columns().map(item => item.name));

  /** Table's data source. */
  public dataSource = signal<typeof this.config.data>([]);

  /** Row menu options. */
  public options = signal<IDashboardTableConfig<T>['options']>([]);

  /** Table column visibility change handler. */
  public columnVisibilityChange(columns: IDashboardTableConfig<T>['columns']) {
    const displayedColumns = columns.map(item => item.name);
    this.displayedColumns.set(displayedColumns);
  }

  /** Option selection handler. */
  public abstract optionSelected(value: string): void;
}
