/** Dashboard table configuration. */
export interface IDashboardTableConfig<T> {
  columns: Array<{ order: number; name: string }>;
  displayedColumns: string[];
  options: Array<{ icon: string; value: string; title: string }>;
  data: T[];
}
