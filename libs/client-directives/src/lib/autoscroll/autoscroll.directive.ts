import { AfterContentInit, Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

const defaultVerticalOffsetLock = 10;

/**
 * Autoscroll directive.
 */
@Directive({
  selector: '[appAutoscroll]',
})
export class AppAutoscrollDirective implements AfterContentInit, OnDestroy {
  @Input() public verticalOffsetLock = defaultVerticalOffsetLock;

  @Input() public observeAttributes = false;

  private lockAutoscroll = false;

  private mutationObserver?: MutationObserver;

  private nativeElement?: HTMLElement;

  constructor(private readonly el: ElementRef) {}

  public getObserveAttributes(): boolean {
    return this.observeAttributes;
  }

  public ngAfterContentInit(): void {
    this.nativeElement = this.el.nativeElement;
    if (typeof this.nativeElement !== 'undefined') {
      this.mutationObserver = new MutationObserver(() => {
        if (!this.lockAutoscroll) {
          this.scrollDown();
        }
      });
      this.mutationObserver.observe(this.nativeElement, {
        childList: true,
        subtree: true,
        attributes: this.getObserveAttributes(),
      });
    }
  }

  public ngOnDestroy(): void {
    if (typeof this.mutationObserver !== 'undefined') {
      this.mutationObserver.disconnect();
    }
  }

  public isLocked(): boolean {
    return this.lockAutoscroll;
  }

  @HostListener('scroll')
  public scrollHandler(): void {
    if (typeof this.nativeElement !== 'undefined') {
      const scrollFromBottom = this.nativeElement.scrollHeight - this.nativeElement.scrollTop - this.nativeElement.clientHeight;
      this.lockAutoscroll = scrollFromBottom > this.verticalOffsetLock;
    }
  }

  /**
   * Forces scroll down.
   */
  private scrollDown(): void {
    if (typeof this.nativeElement !== 'undefined') {
      this.nativeElement.scrollTop = this.nativeElement.scrollHeight;
    }
  }
}
