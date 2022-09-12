import { ActivatedRouteSnapshot, Data, Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export interface IRouterStateModel {
  url: string;
  params: Params;
  queryParams: Params;
  root: Partial<ActivatedRouteSnapshot>;
  data: Data;
}

export interface IRouterState {
  router: RouterReducerState<IRouterStateModel>;
}

export const featureName: keyof IRouterState = 'router';
