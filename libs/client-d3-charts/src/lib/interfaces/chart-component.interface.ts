import type { SimpleChange } from '@angular/core';

/** Chart component input changes. */
export interface IChartInputChanges {
  data?: SimpleChange | null;
  options?: SimpleChange | null;
}
