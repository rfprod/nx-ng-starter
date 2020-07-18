import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Provider } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import {
  IAppHttpProgressStatePayload,
  IHttpProgressHandlers,
  IHttpProgressObservableOutput,
} from './http-progress.interface';
import { AppHttpProgressState, httpProgressActions } from './http-progress.store';

@Injectable({
  providedIn: 'root',
})
export class AppHttpProgressService {
  public readonly output: IHttpProgressObservableOutput = {
    all$: this.store.select(AppHttpProgressState.allProgress),
    mainView$: this.store.select(AppHttpProgressState.mainViewProgress),
  };

  public readonly handlers: IHttpProgressHandlers = {
    mainView: {
      start: () => this.startProgress(this.newAppHttpProgressState(true)),
      stop: () => this.stopProgress(this.newAppHttpProgressState(false)),
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

  constructor(private readonly store: Store, private readonly progressRef: OverlayRef) {}

  private newAppHttpProgressState(mainView?: boolean): Partial<IAppHttpProgressStatePayload> {
    const payload: Partial<IAppHttpProgressStatePayload> =
      typeof mainView === 'boolean' ? { mainView } : {};
    return payload;
  }

  private attachIndicator(): void {
    this.progressRef.attach(new ComponentPortal<MatSpinner>(MatSpinner));
  }

  private detachIndicator(): void {
    this.progressRef.detach();
  }

  private startProgress(payload: Partial<IAppHttpProgressStatePayload>) {
    this.attachIndicator();
    return this.store.dispatch(new httpProgressActions.startProgress(payload));
  }

  private stopProgress(payload: Partial<IAppHttpProgressStatePayload>) {
    this.detachIndicator();
    return this.store.dispatch(new httpProgressActions.stopProgress(payload));
  }
}

/**
 * Http progress service factory constructor.
 */
export type TAppHttpProgressServiceFactoryConstructor = (
  store: Store,
  overlay: Overlay,
) => AppHttpProgressService;

/**
 * Http progress service factory.
 */
export const httpProgressServiceFactory: TAppHttpProgressServiceFactoryConstructor = (
  store: Store,
  overlay: Overlay,
) => {
  const progressRef: OverlayRef = overlay.create({
    hasBackdrop: true,
    backdropClass: 'global-spinner-backdrop-dark',
    positionStrategy: overlay.position().global().centerHorizontally().centerVertically(),
  });
  return new AppHttpProgressService(store, progressRef);
};

/**
 * Http progress service provider.
 */
export const httpProgressServiceProvider: Provider = {
  provide: AppHttpProgressService,
  useFactory: httpProgressServiceFactory,
  deps: [Store, Overlay],
};
