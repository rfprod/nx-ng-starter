import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Route, Router, Routes } from '@angular/router';
import { defer, forkJoin, from, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSearchComponent {
  @HostBinding('class.density-3') public density = true;

  public control = new FormControl('', { nonNullable: true });

  public options: { name: string; value: string; routerLink: string }[] = [];

  public readonly filteredOptions = this.control.valueChanges.pipe(
    startWith(''),
    map(value => this.options.filter(item => item.value.includes(value))),
  );

  constructor(private readonly router: Router) {
    void this.getOptions().subscribe();
  }

  /**
   * Search options getter.
   * @returns search options
   */
  private getOptions() {
    return of(this.router.config).pipe(
      switchMap(routes => {
        const r = routes.flatMap(item => (typeof item.outlet !== 'undefined' ? of([]) : defer(() => from(this.parseRoute(item)))));
        return forkJoin(r);
      }),
      map(result => {
        const options = result
          .flat(1)
          .filter(path => path !== '' && !path.includes('*') && !path.includes(':') && path !== 'offline')
          .map(item => ({
            name: `${item.slice(0, 1).toUpperCase()}${item.slice(1, item.length)}`,
            value: item,
            routerLink: item.replace(/\s/g, '/'),
          }));
        this.options = options;
        return options;
      }),
    );
  }

  /**
   * Child route configuration parser.
   * @param root root path / parent path
   * @param routes child routes
   * @returns the array with routes, route segment separator is space
   */
  private parseChildRoutes(root = '', routes?: Routes): string[] {
    return typeof routes === 'undefined'
      ? [root.trim()]
      : routes.flatMap(child => {
          const path = `${root} ${child.path}`.trim();
          return this.parseChildRoutes(path, child.children);
        });
  }

  /**
   * Router configuration parser.
   * @param root root route
   * @returns the array with routes, route segment separator is space
   */
  private async parseRoute(root: Route): Promise<string[]> {
    const route = { ...root };
    const rootPath = (route.path ?? '').trim();
    const result: string[] = [rootPath];
    let children: Routes = route.children ?? [];
    if (children.length === 0 && typeof route.loadChildren !== 'undefined') {
      await route.loadChildren();
      const loadedRoutes = (<Route & Record<'_loadedRoutes' | string, Route['children']>>route)._loadedRoutes;
      children = typeof loadedRoutes !== 'undefined' ? [...loadedRoutes] : children;
    }
    const resolvers = children.flatMap(async child => {
      const path = `${rootPath} ${child.path}`.trim();
      const expandRoutes = this.parseChildRoutes(path, child.children);
      result.push(...expandRoutes);
      return result;
    });
    if (typeof resolvers !== 'undefined') {
      await Promise.all(resolvers);
    }
    return [...new Set(result)];
  }
}
