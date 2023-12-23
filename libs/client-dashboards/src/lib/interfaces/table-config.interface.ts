/** Dashboard table configuration. */
export interface IDashboardTableConfig<T> {
  columns: { order: number; name: string }[];
  displayedColumns: string[];
  options: { icon: string; value: string; title: string }[];
  data: T[];
}
