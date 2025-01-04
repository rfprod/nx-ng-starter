import type { ActivatedRouteSnapshot, Data, Params } from '@angular/router';
import type { RouterReducerState } from '@ngrx/router-store';

/** Router state model. */
export interface IRouterStateModel {
  url: string;
  params: Params;
  queryParams: Params;
  root: Partial<ActivatedRouteSnapshot>;
  data: Data;
}

/** Router state. */
export interface IRouterState {
  router: RouterReducerState<IRouterStateModel>;
}

/** Router feature name. */
export const featureName: keyof IRouterState = 'router';
