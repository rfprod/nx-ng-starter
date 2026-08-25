import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostBinding, inject, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { isActive, IsActiveMatchOptions, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  defer,
  distinctUntilChanged,
  forkJoin,
  from,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

import { AppSearchService, IParsedRoute } from '../../services/search/search.service';

interface ISearchOption {
  name: string;
  description: string;
  icon?: string;
  value: string;
  routerLink: string;
  match: boolean;
  isActive: ReturnType<typeof isActive>;
  children: Array<Omit<ISearchOption, 'children'>>;
}

type TChild = Record<string, string | Pick<IsActiveMatchOptions, 'paths'>>;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppSearchComponent implements AfterViewInit {
  readonly #config: { dedounceTime: number } = { dedounceTime: 175 };

  readonly #router = inject(Router);

  readonly #search = inject(AppSearchService);

  @HostBinding('class.density-3') public density = true;

  /** The autocomplete input. */
  @ViewChild(MatInput) public matInput?: MatInput;

  /** Event emitter to notify the parent component that an option has been selected. */
  @Output() public readonly optionSelected = new EventEmitter<void>();

  /** The autocomplete input form control. */
  public control = new FormControl('', { nonNullable: true });

  /** The search options state. */
  private readonly optionsSubject = new BehaviorSubject<ISearchOption[]>([]);

  /** The options value for the autocomplete. */
  public readonly filteredOptions = combineLatest([
    this.control.valueChanges.pipe(startWith(''), debounceTime(this.#config.dedounceTime), distinctUntilChanged()),
    this.optionsSubject.asObservable(),
  ]).pipe(
    map(([value, options]) => {
      const searchTerm = value.toLowerCase();
      if (searchTerm.length === 0) {
        return options;
      }
      return options
        .filter(item => {
          const match = item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
          const childMatch = item.children.some(
            child => child.name.toLowerCase().includes(searchTerm) || child.description.toLowerCase().includes(searchTerm),
          );
          return match || childMatch;
        })
        .map(item => ({
          ...item,
          match: item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm),
          children: item.children.map(child => ({
            ...child,
            match: child.name.toLowerCase().includes(searchTerm) || child.description.toLowerCase().includes(searchTerm),
          })),
        }));
    }),
  );

  constructor() {
    void this.getOptions().subscribe();
  }

  /**
   * Search option mapper.
   * @param name Option name.
   * @param description Option description.
   * @param path Router path.
   * @param icon Option icon.
   * @param rlaMatchOptions Router link active options.
   */
  #mapSearchOption(
    name: string,
    description: string,
    path: string,
    icon?: string,
    rlaMatchOptions?: Pick<IsActiveMatchOptions, 'paths'>,
  ): Omit<ISearchOption, 'children'> {
    const routerLink = path.replace(/\s/g, '/');
    const option: Omit<ISearchOption, 'children'> = {
      name,
      description,
      value: path,
      icon: icon,
      routerLink,
      match: true,
      isActive: isActive(routerLink, this.#router, {
        matrixParams: 'ignored',
        queryParams: 'ignored',
        paths: rlaMatchOptions?.paths ?? 'exact',
        fragment: 'ignored',
      }),
    };
    return option;
  }

  /**
   * Feature value parser.
   * @param route Parsed application route.
   */
  #featureValue(route: IParsedRoute): string {
    const feature = typeof route.data?.['feature'] === 'string' && route.data['feature'].length > 0 ? route.data['feature'] : route.path;
    return typeof route.data?.['title'] === 'string' && route.data['title'].length > 0
      ? route.data['title']
      : `${feature.slice(0, 1).toUpperCase()}${feature.slice(1, feature.length)}`;
  }

  /**
   * Description value parser.
   * @param route Parsed application route.
   */
  #descriptionValue(route: IParsedRoute): string {
    return typeof route.data?.['description'] === 'string' && route.data['description'].length > 0 ? route.data['description'] : '';
  }

  /**
   * Children value parser.
   * @param route Parsed application route.
   */
  #childrenValue(route: IParsedRoute): TChild[] {
    return typeof route.data?.['children'] === 'string' && Array.isArray(route.data['children']) ? route.data['children'] : [];
  }

  /**
   * Child feature value parser.
   * @param route Parsed application route.
   */
  #childFeatureValue(child: TChild): string | undefined {
    return typeof child['feature'] === 'string' && child['feature'].length > 0 ? child['feature'] : void 0;
  }

  /**
   * Child icon value parser.
   * @param route Parsed application route.
   */
  #childIconValue(child: TChild): string | undefined {
    return typeof child['icon'] === 'string' && child['icon'].length > 0 ? child['icon'] : void 0;
  }

  /**
   * Child path value parser.
   * @param route Parsed application route.
   */
  #childPathValue(routePath: string, child: TChild): string | undefined {
    return typeof child['path'] === 'string' && child['path'].length > 0 ? `${routePath}/${child['path']}` : void 0;
  }

  /**
   * Child route link active match options value parser.
   * @param route Parsed application route.
   */
  #childRlaMatchOptionsValue(child: TChild): Pick<IsActiveMatchOptions, 'paths'> | undefined {
    return typeof child['rlaMatchOptions'] === 'object' && Object.keys(child['rlaMatchOptions']).length > 0
      ? child['rlaMatchOptions']
      : void 0;
  }

  /**
   * Child skip search value parser.
   * @param route Parsed application route.
   */
  #childSkipSearchValue(child: TChild): boolean {
    return 'skipSearch' in child && typeof child['skipSearch'] === 'boolean' ? child['skipSearch'] : false;
  }

  /**
   * Search options getter.
   * @returns search options
   */
  private getOptions() {
    return of(this.#router.config).pipe(
      switchMap(routes => {
        const r = routes.flatMap(item => (typeof item.outlet !== 'undefined' ? of([]) : defer(() => from(this.#search.parseRoute(item)))));
        return forkJoin(r);
      }),
      map(routes => {
        const options = routes
          .flat(1)
          .filter(route => this.#search.routeFilter(route))
          .map(route => {
            const feature = this.#featureValue(route);
            const description = this.#descriptionValue(route);
            const children = this.#childrenValue(route);
            return {
              ...this.#mapSearchOption(feature, description, route.path, route.data?.['icon'], route.data?.['rlaMatchOptions']),
              children: children.reduce((accumulator: Array<Omit<ISearchOption, 'children'>>, child: TChild) => {
                const childFeature = this.#childFeatureValue(child);
                const childIcon = this.#childIconValue(child);
                const childPath = this.#childPathValue(route.path, child);
                const childRlaMatchOptions = this.#childRlaMatchOptionsValue(child);
                const skipSearch = this.#childSkipSearchValue(child);
                if (
                  typeof childFeature !== 'undefined' &&
                  typeof childIcon !== 'undefined' &&
                  typeof childPath !== 'undefined' &&
                  !skipSearch
                ) {
                  const childOption = this.#mapSearchOption(childFeature, '', childPath, childIcon, childRlaMatchOptions);
                  accumulator.push(childOption);
                }
                return accumulator;
              }, []),
            };
          });
        options.sort((x, y) => x.name.localeCompare(y.name));
        this.optionsSubject.next(options);
        return options;
      }),
    );
  }

  /**
   * Select option handler.
   * @param routerLink the option's router link
   */
  public selectOption(routerLink: string) {
    this.optionSelected.emit();
    void this.#router.navigate([routerLink]);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      const matInput = this.matInput;
      if (typeof matInput !== 'undefined') {
        matInput.focus();
      }
    });
  }
}
