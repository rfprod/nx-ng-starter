import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Params, ResolveEnd, Router } from '@angular/router';

import { MatSidenav } from '@angular/material';

import { untilDestroyed } from 'ngx-take-until-destroy';

/**
 * Application root component.
 */
@Component({
  selector: 'nx-ng-starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Component title.
   */
  public title = 'Components library';

  /**
   * Sidenav viewchild reference.
   */
  @ViewChild('appSidenav', { static: true }) public sidenavSections: MatSidenav;
  /**
   * Indicates if sidenav is opened.
   */
  public sidenavOpened = false;
  /**
   * Selected demo item name.
   */
  public selectedItem = '';

  /**
   * Constructor.
   * @param router application router
   * @param route activated route
   */
  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}
  /**
   * Selects item by name.
   * @param itemName item name that should be selected
   */
  public selectItem(itemName?: string): void {
    if (!itemName) {
      this.router.navigate(['/index'], { queryParams: { demo: '' } });
    } else {
      this.router.navigate(['/index'], { queryParams: { demo: itemName } });
      this.selectedItem = itemName || '';
      this.sidenavSections.toggle();
    }
  }

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    this.router.events.pipe(untilDestroyed(this)).subscribe((event: any) => {
      if (event instanceof ResolveEnd) {
        console.log('AppComponent, router events subscription, resolve end', event);
      }
    });

    /*
     *	subscribe to query params changes and switch display mode
     */
    this.route.queryParamMap.pipe(untilDestroyed(this)).subscribe((queryParams: Params) => {
      if (typeof queryParams.get('demo') === 'string') {
        this.selectedItem = queryParams.get('demo') || '';
      }
    });
  }

  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {}
}
