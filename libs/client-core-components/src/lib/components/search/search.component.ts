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
}

interface IParsedRoute {
  path: string;
  data?: Data;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSearchComponent implements AfterViewInit {
  @HostBinding('class.density-3') public density = true;

  /**
   * The autocomplete input.
   */
  @ViewChild(MatInput) public matInput!: MatInput;

  /**
   * Event emitter to notify the parent component that an option has been selected.
   */
  @Output() public readonly optionSelected = new EventEmitter<void>();

  /**
   * The autocomplete input form control.
   */
  public control = new FormControl('', { nonNullable: true });

  /**
   * The search options state.
   */
  private readonly optionsSubject = new BehaviorSubject<ISearchOptions[]>([]);

  /**
   * The options value for the autocomplete.
   */
  public readonly filteredOptions = combineLatest([this.control.valueChanges.pipe(startWith('')), this.optionsSubject.asObservable()]).pipe(
    map(([value, options]) => options.filter(item => item.value.includes(value))),
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
          .filter(route => route.path !== '' && !route.path.includes('*') && !route.path.includes(':') && route.path !== 'offline')
          .map(route => {
            const data = route.data;
            const feature = typeof data?.feature === 'string' && data.feature.length > 0 ? data.feature : route.path;
            return {
              name: `${feature.slice(0, 1).toUpperCase()}${feature.slice(1, feature.length)}`,
              value: route.path,
              icon: route.data?.icon,
              routerLink: route.path.replace(/\s/g, '/'),
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
   * @param routes child routes
   * @returns the array with routes, route segment separator is space
   */
  private parseChildRoutes(root = '', data?: Data, routes?: Routes): IParsedRoute[] {
    return typeof routes === 'undefined'
      ? [{ path: root.trim(), data }]
      : routes.flatMap(child => {
          const childPath = `${root} ${child.path}`.trim();
          const childData = child.data;
          return this.parseChildRoutes(childPath, childData, child.children);
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
    const result: IParsedRoute[] = [{ path: rootPath, data: root.data }];
    let children: Routes = route.children ?? [];
    if (children.length === 0 && typeof route.loadChildren !== 'undefined') {
      await route.loadChildren();
      const loadedRoutes = (<Route & Record<'_loadedRoutes' | string, Route['children']>>route)._loadedRoutes;
      children = typeof loadedRoutes !== 'undefined' ? [...loadedRoutes] : children;
    }
    const resolvers = children.flatMap(async child => {
      const childPath = `${rootPath} ${child.path}`.trim();
      const childData = child.data;
      const expandRoutes = this.parseChildRoutes(childPath, childData, child.children);
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
