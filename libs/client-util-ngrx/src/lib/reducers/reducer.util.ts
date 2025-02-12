import type { InjectionToken } from '@angular/core';
import type { ActionReducer } from '@ngrx/store';

export interface IReducerConfig<T = string, M = Record<string, unknown>> {
  featureName: T;
  token: InjectionToken<ActionReducer<M>>;
  initialState: M;
}
