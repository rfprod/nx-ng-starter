import type { ElementRef } from '@angular/core';

/** D3 chart base class. */
export abstract class AppD3ChartBase<T, O> {
  /** A chart id. */
  public abstract chartId: string;

  /** A chart data. */
  public abstract data: T;

  /** A chart options. */
  public abstract options: O;

  /** D3 chart view child reference. */
  public abstract readonly container?: ElementRef<HTMLDivElement>;

  /** The chart options constructor. */
  protected abstract chartOptions(): O;

  /** Draws the chart. */
  protected abstract drawChart(): void;
}
