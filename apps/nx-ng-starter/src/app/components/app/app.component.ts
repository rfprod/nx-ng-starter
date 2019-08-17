import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import {
  Router,
  ActivatedRoute,
  Params,
  ResolveEnd
} from '@angular/router';

import { MatSidenav } from '@angular/material';

import { EventEmitterService } from '@nx-ng-starter/shared-core/data-access';

import { untilDestroyed } from 'ngx-take-until-destroy';

/**
 * Application root component.
 */
@Component({
  selector: 'nx-ng-starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private emitter: EventEmitterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Component title.
   */
  public title: string = 'Components library';

  /**
   * Sidenav viewchild reference.
   */
  @ViewChild('appSidenav', { static: true }) public sidenavSections: MatSidenav;
  /**
   * Indicates if sidenav is opened.
   */
  public sidenavOpened: boolean = false;
  /**
   * Selected demo item name.
   */
  public selectedItem: string = '';
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

    this.emitter.getEmitter().pipe(untilDestroyed(this)).subscribe((event: any) => {
      console.log('AppComponent, event emitter subscription', event);
    });

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
