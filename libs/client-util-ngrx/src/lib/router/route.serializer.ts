import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface IRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface IRouterState {
  navigationId: number;
  state: IRouterStateUrl;
}

/**
 * Returns an object with a partial router state instead of the full router state snapshot.
 */
export class AppRouteSerializer implements RouterStateSerializer<IRouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}
