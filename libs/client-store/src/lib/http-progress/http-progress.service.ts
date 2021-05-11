import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Provider } from '@angular/core';
import { tap } from 'rxjs/operators';

import { AppGlobalProgressBarComponent } from './components/global-progress-bar/global-progress-bar.component';
import { IHttpProgressHandlers } from './http-progress.interface';

@Injectable({
  providedIn: 'root',
})
export class AppHttpProgressService {
  public readonly handlers: IHttpProgressHandlers = {
    mainView: {
      start: () => this.startProgress(),
      stop: () => this.stopProgress(),
      tapStopperObservable: <T>() => {
        return tap<T>(
          () => {
            this.handlers.mainView.stop();
          },
          () => {
            this.handlers.mainView.stop();
          },
        );
      },
    },
  };

  constructor(private readonly progressRef: OverlayRef) {}

  private attachIndicator(): void {
    this.progressRef.attach(new ComponentPortal<AppGlobalProgressBarComponent>(AppGlobalProgressBarComponent));
  }

  public detachIndicator(): void {
    this.progressRef.detach();
  }

  private startProgress() {
    if (!this.progressRef.hasAttached()) {
      this.attachIndicator();
    }
  }

  private stopProgress() {
    if (this.progressRef.hasAttached()) {
      this.detachIndicator();
    }
  }
}

/**
 * Http progress service provider.
 */
export const httpProgressServiceProvider: Provider = {
  provide: AppHttpProgressService,
  useFactory: (overlay: Overlay) => {
    const progressRef: OverlayRef = overlay.create({
      hasBackdrop: true,
      backdropClass: 'global-spinner-backdrop-dark',
      positionStrategy: overlay.position().global().top(),
    });
    return new AppHttpProgressService(progressRef);
  },
  deps: [Overlay],
};
