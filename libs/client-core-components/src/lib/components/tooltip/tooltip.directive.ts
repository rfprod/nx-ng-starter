import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterContentInit, Directive, ElementRef, HostListener, Injector, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { OVERLAY_REFERENCE } from '@app/client-material';

import { AppTooltipComponent } from './tooltip.component';
import { TOOLTIP_DATA } from './tooltip.interface';

@Directive({
  selector: '[appTooltip]',
})
export class AppTooltipDirective implements AfterContentInit, OnDestroy {
  @Input() public appTooltip?: string = void 0;

  @Input() public appTooltipDisabled = false;

  @Input() public tooltipOnlyClamped = false;

  @Input() public flexibleConnectedPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
    },
  ];

  @Input() public scrollStrategy: 'block' | 'close' | 'noop' | 'reposition' = 'reposition';

  private nativeElement?: HTMLElement;

  private overlayRef: OverlayRef | null = null;

  constructor(
    private readonly el: ElementRef,
    private readonly overlay: Overlay,
    private readonly overlayConfig: OverlayConfig,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

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

  private createOverlay(): OverlayRef | null {
    if (this.overlayRef === null) {
      this.configureOverlay();
      this.overlayRef = this.overlay.create(this.overlayConfig);
    }
    return this.overlayRef;
  }

  protected disposeTooltip(): void {
    if (this.overlayRef !== null) {
      void this.overlayRef?.detach();
      void this.overlayRef?.dispose();
      this.overlayRef = null;
    }
  }

  private displayTooltip(): void {
    const showTooltip = this.tooltipOnlyClamped
      ? typeof this.nativeElement !== 'undefined' && this.nativeElement.scrollWidth > this.nativeElement.clientWidth
      : true;
    if (!this.appTooltipDisabled && typeof this.appTooltip !== 'undefined' && !this.overlayRef?.hasAttached && showTooltip) {
      const overlayRef = this.createOverlay();
      const context = Injector.create({
        providers: [
          {
            provide: OVERLAY_REFERENCE,
            useValue: overlayRef,
          },
          {
            provide: TOOLTIP_DATA,
            useValue: {
              text: this.appTooltip,
            },
          },
        ],
      });
      const portal = new ComponentPortal(AppTooltipComponent, this.viewContainerRef, context);
      void this.overlayRef?.attach(portal);
    }
  }

  public ngAfterContentInit(): void {
    this.nativeElement = this.el.nativeElement;
  }

  @HostListener('mouseenter')
  public showTooltip(): void {
    this.displayTooltip();
  }

  @HostListener('mouseleave')
  public hideTooltip(): void {
    this.disposeTooltip();
  }

  public ngOnDestroy(): void {
    this.disposeTooltip();
  }
}
