import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AppGlobalProgressBarComponent } from '../../components/global-progress-bar/global-progress-bar.component';
import { IHttpProgressHandler } from '../../http-progress.interface';

/**
 * Http progress service controls the global progress indicator visibility.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpProgressService {
  private readonly overlay = inject(Overlay);

  public readonly progressRef: OverlayRef;

  public readonly globalProgressHandler: IHttpProgressHandler = {
    start: () => this.startProgress(),
    stop: () => this.stopProgress(),
    tapStopperObservable: <T>() => {
      return tap<T>({
        next: () => {
          this.globalProgressHandler.stop();
        },
        error: () => {
          this.globalProgressHandler.stop();
        },
      });
    },
  };

  constructor() {
    this.progressRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: '',
      positionStrategy: this.overlay.position().global().top(),
    });
  }

  private attachIndicator(): void {
    this.progressRef.attach(new ComponentPortal<AppGlobalProgressBarComponent>(AppGlobalProgressBarComponent));
  }

  public detachIndicator(): void {
    this.progressRef.detach();
  }

  private startProgress(): void {
    if (!this.progressRef.hasAttached()) {
      this.attachIndicator();
    }
  }

  private stopProgress(): void {
    if (this.progressRef.hasAttached()) {
      this.detachIndicator();
    }
  }
}
