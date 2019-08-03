import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  ElementRef,
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

/**
 * Application root component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private el: ElementRef,
    private emitter: EventEmitterService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject('Window') private window: Window
  ) {
    // console.log('AppComponent, element ref', this.el);
  }

  /**
   * Component subscriptions.
   */
  private subscriptions: any[] = [];

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
   * Loading state, controls loading spinner visibility.
   */
  public isLoading: boolean = false;
  /**
   * Spinner calls count, used to determine when to stop it.
   */
  private spinnerCallsCounter: number = 0;
  /**
   * Shows spinner, increases spinner calls counter.
   */
  private showSpinner(): void {
    this.spinnerCallsCounter++;
    this.isLoading = true;
  };
  /**
   * Hides spinner, decreases spinner calls counter.
   * This method should be called equal to or more times than showSpinner for spinner to get actually hidden
   */
  private hideSpinner(): void {
    this.spinnerCallsCounter--;
    this.isLoading = (this.spinnerCallsCounter <= 0) ? false : this.isLoading;
  };

  /**
   * Lifecycle hook called on component initialization.
   */
  public ngOnInit(): void {
    let sub = this.emitter.getEmitter().subscribe((event: any) => {
      console.log('AppComponent, event emitter subscription', event);
      if (event.spinner) {
        if (event.spinner === 'start') {
          this.showSpinner();
        } else if (event.spinner === 'stop') {
          this.hideSpinner();
        }
      }
    });
    this.subscriptions.push(sub);

    sub = this.router.events.subscribe((event: any) => {
      // console.log('AppComponent, router events subscription:', event);
      if (event instanceof ResolveEnd) {
        console.log('AppComponent, router events subscription, resolve end', event);
      }
    });
    this.subscriptions.push(sub);

    /*
    *	subscribe to query params changes and switch display mode
    */
    sub = this.route.queryParamMap.subscribe((queryParams: Params) => {
      if (typeof queryParams.get('demo') === 'string') {
        this.selectedItem = queryParams.get('demo') || '';
      }
    });
    this.subscriptions.push(sub);
  }
  /**
   * Lifecycle hook called on component destruction.
   */
  public ngOnDestroy(): void {
    if (this.subscriptions.length) {
      for (const sub of this.subscriptions) {
        sub.unsubscribe();
      }
    }
  }
}
