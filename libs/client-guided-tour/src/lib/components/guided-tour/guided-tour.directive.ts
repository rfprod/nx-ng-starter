import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { AfterContentInit, Directive, ElementRef, Inject, Injector, Input, OnDestroy, ViewContainerRef } from '@angular/core';

import { OVERLAY_REFERENCE } from '../../providers/overlay.provider';
import { AppGuidedTourService } from '../../services/guided-tour/guided-tour.service';
import { AppGuidedTourComponent } from './guided-tour.component';
import { GUIDED_TOUR_DATA, IGuidedTourData } from './guided-tour.interface';

/** Guided tour directive. */
@Directive({
  selector: '[appGuidedTour]',
  standalone: false,
})
export class AppGuidedTourDirective implements AfterContentInit, OnDestroy {
  /** Guided tour step configuration. */
  @Input() public appGuidedTour: IGuidedTourData | undefined = void 0;

  @Input() public highlightElement = false;

  /** Connected positions configuration. */
  @Input() public flexibleConnectedPositions: ConnectedPosition[] = [
    // below the origin
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    // above the origin
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
    },
    {
      originX: 'center',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
    },
    // to the left of the origin
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'bottom',
    },
    // to the right of the origin
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  /** Scroll strategy. */
  @Input() public scrollStrategy: 'block' | 'close' | 'noop' | 'reposition' = 'reposition';

  /** Native element ref. */
  private nativeElement?: HTMLElement;

  /** Original position of the native element. */
  private nativeElementOriginalPosition?: string;

  /** Native element frame. */
  private readonly nativeElementFrame: HTMLElement = this.doc.createElement('div');

  /** Overlay reference. */
  private overlayRef: OverlayRef | null = null;

  /**
   * @param el A wrapper around a native element inside of a View.
   * @param overlay Service to create Overlays.
   * @param overlayConfig Initial configuration used when creating an overlay.
   * @param viewContainerRef Represents a container where one or more views can be attached to a component.
   * @param tour Guided tour service.
   */
  constructor(
    private readonly el: ElementRef,
    private readonly overlay: Overlay,
    private readonly overlayConfig: OverlayConfig,
    private readonly viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private readonly doc: Document,
    private readonly tour: AppGuidedTourService,
  ) {}

  /** Overlay configurator. */
  private configureOverlay(): void {
    const positionHost = this.nativeElement;
    if (typeof positionHost !== 'undefined') {
      this.overlayConfig.hasBackdrop = false;
      this.overlayConfig.panelClass = '';
      this.overlayConfig.minHeight = void 0;
      this.overlayConfig.minWidth = void 0;
      this.overlayConfig.maxHeight = void 0;
      this.overlayConfig.maxWidth = void 0;
      this.overlayConfig.height = void 0;
      this.overlayConfig.width = void 0;
      switch (this.scrollStrategy) {
        case 'block':
          this.overlayConfig.scrollStrategy = this.overlay.scrollStrategies.block();
          break;
        case 'close':
          this.overlayConfig.scrollStrategy = this.overlay.scrollStrategies.close();
          break;
        case 'noop':
          this.overlayConfig.scrollStrategy = this.overlay.scrollStrategies.noop();
          break;
        case 'reposition':
        default:
          this.overlayConfig.scrollStrategy = this.overlay.scrollStrategies.reposition();
          break;
      }
      this.overlayConfig.positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(positionHost)
        .setOrigin(positionHost)
        .withPositions(this.flexibleConnectedPositions);
    }
  }

  /** Overlay creator. */
  private createOverlay(): OverlayRef | null {
    if (this.overlayRef === null) {
      this.configureOverlay();
      this.overlayRef = this.overlay.create(this.overlayConfig);
    }
    return this.overlayRef;
  }

  /** Disposes an overlay. */
  public dispose(): void {
    if (this.overlayRef !== null) {
      void this.overlayRef?.detach();
      void this.overlayRef?.dispose();
      this.overlayRef = null;
      this.decorateNativeEl(true);
    }
  }

  /** Displays an overlay. */
  public display(): void {
    if (typeof this.appGuidedTour !== 'undefined' && !this.overlayRef?.hasAttached) {
      const overlayRef = this.createOverlay();
      const context = Injector.create({
        providers: [
          {
            provide: OVERLAY_REFERENCE,
            useValue: overlayRef,
          },
          {
            provide: GUIDED_TOUR_DATA,
            useValue: { ...this.appGuidedTour },
          },
          {
            provide: AppGuidedTourService,
            useValue: this.tour,
          },
        ],
      });
      const portal = new ComponentPortal(AppGuidedTourComponent, this.viewContainerRef, context);
      const ref = this.overlayRef?.attach(portal);
      ref?.changeDetectorRef.detectChanges();
      this.decorateNativeEl();
    }
  }

  /** Adds elevation to the DOM element and scrolls the element into view. */
  private decorateNativeEl(reset?: boolean) {
    if (typeof this.nativeElement !== 'undefined' && this.highlightElement) {
      const rect = this.nativeElement.getBoundingClientRect();
      this.nativeElementOriginalPosition = this.nativeElement.style.position;
      this.nativeElement.style.position = 'relative';
      this.nativeElementFrame.style.position = 'absolute';
      this.nativeElementFrame.style.width = `${rect.width}px`;
      this.nativeElementFrame.style.height = `${rect.height}px`;
      this.nativeElementFrame.style.top = '0px';
      this.nativeElementFrame.style.left = '0px';
      this.nativeElementFrame.style.zIndex = '999';
      this.nativeElementFrame.style.boxShadow = '0 0 0 1000px rgba(0,0,0,0.3)';
      this.nativeElementFrame.style.boxShadow = '0 0 0 1000vmax rgba(0,0,0,0.3)';
      this.nativeElementFrame.style.pointerEvents = 'none';
      if (reset === true) {
        this.nativeElement.removeChild(this.nativeElementFrame);
        this.nativeElement.style.position = this.nativeElementOriginalPosition;
        return;
      }
      this.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.nativeElement.appendChild(this.nativeElementFrame);
    }
  }

  public ngAfterContentInit(): void {
    this.nativeElement = this.el.nativeElement;
  }

  public ngOnDestroy(): void {
    this.dispose();
  }
}
