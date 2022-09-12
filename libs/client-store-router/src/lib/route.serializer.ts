import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

import { IRouterStateModel } from './router.interface';

/**
 * Returns an object with a partial router state instead of the full router state snapshot.
 */
export class AppRouteSerializer implements RouterStateSerializer<IRouterStateModel> {
  public serialize(routerState: RouterStateSnapshot): IRouterStateModel {
    let root = routerState.root;

    while (root.firstChild) {
      root = root.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, data } = root;

    return { url, params, queryParams, data, root: {} };
  }
}
