import { Injectable, Provider } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';

import { ComponentPortal } from '@angular/cdk/portal';

import { MatSpinner } from '@angular/material';

import { BehaviorSubject } from 'rxjs';

import { delay, map, scan } from 'rxjs/operators';

/**
 * Progress service.
 * Shows loading indicator.
 */
@Injectable()
export class ProgressService {
  /**
   * Progress subject.
   */
  private readonly progress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Constructor.
   * @param progressRef spinner overlay reference
   */
  constructor(private readonly progressRef: OverlayRef) {
    this.progress
      .asObservable()
      .pipe(
        map((value: boolean) => (value ? 1 : -1)),
        scan((acc: number, value: number) => (acc + value >= 0 ? acc + value : 0), 0),
        delay(0),
      )
      .subscribe((result: number) => {
        console.log('global spinner, res', result);
        if (result === 1 && !this.progressRef.hasAttached()) {
          console.log('show progress');
          this.progressRef.attach(new ComponentPortal<MatSpinner>(MatSpinner));
        } else if (result === 0 && this.progressRef.hasAttached()) {
          console.log('hide progress');
          this.progressRef.detach();
        }
      });
  }

  /**
   * Shows progress.
   */
  public show(): void {
    this.progress.next(true);
  }

  /**
   * Hides progress.
   */
  public hide(): void {
    this.progress.next(false);
  }

  /**
   * Returns progress value.
   */
  public value(): boolean {
    return this.progress.value;
  }
}

/**
 * Progress service factory constructor.
 */
export type ProgressServiceFactoryConstructor = (overlay: Overlay) => ProgressService;

/**
 * Progress service factory.
 */
export const progressServiceFactory: ProgressServiceFactoryConstructor = (overlay: Overlay) => {
  const progressRef: OverlayRef = overlay.create({
    hasBackdrop: true,
    backdropClass: 'global-spinner-backdrop-dark',
    positionStrategy: overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
  });
  return new ProgressService(progressRef);
};

/**
 * Progress service provider.
 */
export const progressServiceProvider: Provider = {
  provide: ProgressService,
  useFactory: progressServiceFactory,
  deps: [Overlay],
};
