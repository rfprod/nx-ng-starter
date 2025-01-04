import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Data, Route, Router, Routes } from '@angular/router';
import { BehaviorSubject, combineLatest, defer, forkJoin, from, map, of, startWith, switchMap } from 'rxjs';

interface ISearchOptions {
  name: string;
  icon?: string;
  value: string;
  routerLink: string;
  isActive: () => ReturnType<Router['isActive']>;
}

interface IParsedRoute {
  path: string;
  outlet?: string;
  data?: Data;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppSearchComponent implements AfterViewInit {
  @HostBinding('class.density-3') public density = true;

  /** The autocomplete input. */
  @ViewChild(MatInput) public matInput!: MatInput;

  /** Event emitter to notify the parent component that an option has been selected. */
  @Output() public readonly optionSelected = new EventEmitter<void>();

  /** The autocomplete input form control. */
  public control = new FormControl('', { nonNullable: true });

  /** The search options state. */
  private readonly optionsSubject = new BehaviorSubject<ISearchOptions[]>([]);

  /** The options value for the autocomplete. */
  public readonly filteredOptions = combineLatest([this.control.valueChanges.pipe(startWith('')), this.optionsSubject.asObservable()]).pipe(
    map(([value, options]) =>
      options.filter(item => {
        const searchTerm = value.toLowerCase();
        return item.name.toLowerCase().includes(searchTerm) || item.value.toLowerCase().includes(searchTerm);
      }),
    ),
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
      map(routes => {
        const options = routes
          .flat(1)
          .filter(
            route =>
              /** Routes with empty paths that do not have Router data defining a feature are ignored by the application global search.  */
              (route.path !== '' || (route.path === '' && typeof route.data !== 'undefined' && 'feature' in route.data)) &&
              /** Routes that defined redirects are ignored by the application global search.  */
              !route.path.includes('*') &&
              /** Routes that require path parameters are ignored by the application global search.  */
              !route.path.includes(':') &&
              /** Routes with defined outlets are ignored by the application global search.  */
              typeof route.outlet === 'undefined' &&
              /** PWA offline route is ignored by the application global search. */
              route.path !== 'offline',
          )
          .map(route => {
            const data = route.data;
            const feature = typeof data?.feature === 'string' && data.feature.length > 0 ? data.feature : route.path;
            const name =
              typeof data?.title === 'string' && data.title.length > 0
                ? data.title
                : `${feature.slice(0, 1).toUpperCase()}${feature.slice(1, feature.length)}`;
            return {
              name,
              value: route.path,
              icon: route.data?.icon,
              routerLink: route.path.replace(/\s/g, '/'),
              isActive: () =>
                this.router.isActive(route.path, {
                  matrixParams: 'ignored',
                  queryParams: 'ignored',
                  paths: 'exact',
                  fragment: 'ignored',
                }),
            };
          });
        this.optionsSubject.next(options);
        return options;
      }),
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
  private parseChildRoutes(root = '', data?: Data, outlet?: string, routes?: Routes): IParsedRoute[] {
    return typeof routes === 'undefined'
      ? [{ path: root.trim(), data, outlet }]
      : routes.flatMap(child => {
          const childPath = `${root} ${child.path}`.trim();
          const childData = child.data;
          const childOutlet = child.outlet;
          return this.parseChildRoutes(childPath, childData, childOutlet, child.children);
        });
  }

  /**
   * Router configuration parser.
   * @param root root route
   * @returns the array with routes, route segment separator is space
   */
  private async parseRoute(root: Route): Promise<IParsedRoute[]> {
    const route = { ...root };
    const rootPath = (route.path ?? '').trim();
    const result: IParsedRoute[] = [{ path: rootPath, data: root.data, outlet: route.outlet }];
    let children: Routes = route.children ?? [];
    if (children.length === 0 && typeof route.loadChildren !== 'undefined') {
      await route.loadChildren();
      const loadedRoutes = (route as Route & Record<'_loadedRoutes' | string, Route['children']>)._loadedRoutes;
      children = typeof loadedRoutes !== 'undefined' ? [...loadedRoutes] : children;
    }
    const resolvers = children.flatMap(async child => {
      const childPath = `${rootPath} ${child.path}`.trim();
      const childData = child.data;
      const childOutlet = child.outlet;
      const expandRoutes = this.parseChildRoutes(childPath, childData, childOutlet, child.children);
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

  /**
   * Select option handler.
   * @param routerLink the option's router link
   */
  public selectOption(routerLink: string) {
    this.optionSelected.emit();
    void this.router.navigate([routerLink]);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.matInput.focus();
    });
  }
}
