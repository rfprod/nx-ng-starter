import { Directive, ElementRef, signal } from '@angular/core';

interface IStyleConfiguration {
  width: string;
  height: string;
  position: string;
  top: string;
  bottom: string;
}

/** Full screen directive. */
@Directive({
  selector: '[appFullScreen]',
  exportAs: 'fullScreen',
  standalone: false,
})
export class AppFullScreenDirective {
  /** Original styles of the component. */
  private readonly originalStyles = signal<IStyleConfiguration | null>(null);

  /** Full screen state. */
  public readonly enabled$ = signal<boolean>(false);

  /**
   * @param el Element reference.
   */
  constructor(private readonly el: ElementRef<HTMLElement>) {}

  /**
   * Create a copy of the original styles.
   * @param el HTML element.
   */
  private backUpStyles(el: HTMLElement) {
    const styles: IStyleConfiguration = {
      width: el.style.width,
      height: el.style.height,
      position: el.style.position,
      top: el.style.top,
      bottom: el.style.bottom,
    };
    this.originalStyles.set(styles);
  }

  /**
   * Restore original styles from a copy.
   * @param el HTML element.
   */
  private restoreStyles(el: HTMLElement) {
    const styles = this.originalStyles();
    if (styles !== null) {
      el.style.width = styles.width;
      el.style.height = styles.height;
      el.style.position = styles.position;
      el.style.top = styles.top;
      el.style.bottom = styles.bottom;
      this.originalStyles.set(null);
    }
  }

  /**
   * Set element styles.
   * @param el HTML element.
   */
  private setStyles(el: HTMLElement) {
    el.style.width = '100vw';
    el.style.height = '100vw';
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.bottom = '0';
  }

  /** Toggle full screen. */
  public toggle(): void {
    const fullScreen = this.originalStyles();
    switch (fullScreen) {
      case null:
        this.maximize();
        break;
      default:
        this.minimize();
        break;
    }
  }

  /** Enable full screen mode. */
  public maximize(): void {
    const el = this.el.nativeElement;
    if (typeof el !== 'undefined') {
      this.backUpStyles(el);
      this.setStyles(el);
      this.enabled$.set(true);
    }
  }

  /** Disable full screen mode. */
  public minimize(): void {
    const el = this.el.nativeElement;
    if (typeof el !== 'undefined') {
      this.restoreStyles(el);
      this.enabled$.set(false);
    }
  }
}
