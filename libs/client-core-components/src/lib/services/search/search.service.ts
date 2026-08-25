import { Injectable } from '@angular/core';
import { Data, Route, Routes } from '@angular/router';

/** Parsed application route. */
export interface IParsedRoute {
  path: string;
  outlet?: string;
  data?: Data;
}

@Injectable({
  providedIn: 'root',
})
export class AppSearchService {
  /** Route filtering logic for the application search. */
  readonly #filters = Object.freeze({
    /** Filters routes with empty paths that do not have a `feature` property defined in their `data` object. */
    notEmptyWithData: (route: IParsedRoute) =>
      route.path !== '' || (route.path === '' && typeof route.data !== 'undefined' && 'feature' in route.data),
    /** Filters routes containing a `skipSearch` instruction which value is `true` in their `data` object. */
    noExplicitSkipSearch: (route: IParsedRoute) =>
      !(typeof route.data !== 'undefined' && 'skipSearch' in route.data && route.data['skipSearch'] === true),
  });

  /**
   * The main route filtering logic.
   * @param route Parsed application route.
   */
  public routeFilter(route: IParsedRoute): boolean {
    return (
      this.#filters.notEmptyWithData(route) &&
      this.#filters.noExplicitSkipSearch(route) &&
      !route.path.includes('*') &&
      !route.path.includes(':') &&
      typeof route.outlet === 'undefined' &&
      route.path !== 'offline' &&
      route.path !== 'error'
    );
  }

  /**
   * Child route configuration parser.
   * @param root root path / parent path
   * @param data root path data / parent path data
   * @param outlet router outlet for the given route
   * @param routes child routes
   * @returns the array with routes, route segment separator is space
   */
  #parseChildRoutes(root = '', data?: Data, outlet?: string, routes?: Routes): IParsedRoute[] {
    return typeof routes === 'undefined'
      ? [{ path: root.trim(), data, outlet }]
      : routes.flatMap(child => {
          const childPath = `${root} ${child.path}`.trim();
          const childData = child.data;
          const childOutlet = child.outlet;
          return this.#parseChildRoutes(childPath, childData, childOutlet, child.children);
        });
  }

  /**
   * Router configuration parser.
   * @param root root route
   * @returns the array with routes, route segment separator is space
   */
  public async parseRoute(root: Route): Promise<IParsedRoute[]> {
    const route = { ...root };
    const rootPath = (route.path ?? '').trim();
    const result: IParsedRoute[] = [{ path: rootPath, data: root.data, outlet: route.outlet }];
    let children: Routes = route.children ?? [];
    if (children.length === 0 && typeof route.loadChildren !== 'undefined') {
      await route.loadChildren();
      const loadedRoutes = (route as Route & Record<'_loadedRoutes' | string, Route['children']>)['_loadedRoutes'];
      children = typeof loadedRoutes !== 'undefined' ? [...loadedRoutes] : children;
    }
    const resolvers = children.flatMap(async child => {
      const childPath = `${rootPath} ${child.path}`.trim();
      const childData = child.data;
      const childOutlet = child.outlet;
      const expandRoutes = this.#parseChildRoutes(childPath, childData, childOutlet, child.children);
      result.push(...expandRoutes);
      return result;
    });
    if (typeof resolvers !== 'undefined') {
      await Promise.all(resolvers);
    }
    return result.reduce((accumulator: IParsedRoute[], record) => {
      const exists = accumulator.findIndex(item => item.path === record.path);
      if (exists === -1) {
        accumulator.push(record);
      }
      return accumulator;
    }, []);
  }
}
