import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Provider } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import {
  IHttpProgressHandlers,
  IHttpProgressObservableOutput,
  IHttpProgressStatePayload,
} from './http-progress.interface';
import { httpProgressActions, HttpProgressState } from './http-progress.store';

@Injectable({
  providedIn: 'root',
})
export class HttpProgressService {
  public readonly output: IHttpProgressObservableOutput = {
    all$: this.store.select(HttpProgressState.allProgress),
    mainView$: this.store.select(HttpProgressState.mainViewProgress),
  };

  public readonly handlers: IHttpProgressHandlers = {
    mainView: {
      start: () => this.startProgress(this.newHttpProgressState(true)),
      stop: () => this.stopProgress(this.newHttpProgressState(false)),
      tapStopperObservable: <Any>() => {
        return tap<Any>(
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

  private newHttpProgressState(mainView?: boolean): Partial<IHttpProgressStatePayload> {
    const payload: Partial<IHttpProgressStatePayload> =
      typeof mainView === 'boolean' ? { mainView } : {};
    return payload;
  }

  private attachIndicator(): void {
    this.progressRef.attach(new ComponentPortal<MatSpinner>(MatSpinner));
  }

  private detachIndicator(): void {
    this.progressRef.detach();
  }

  private startProgress(payload: Partial<IHttpProgressStatePayload>) {
    this.attachIndicator();
    return this.store.dispatch(new httpProgressActions.startProgress(payload));
  }

  private stopProgress(payload: Partial<IHttpProgressStatePayload>) {
    this.detachIndicator();
    return this.store.dispatch(new httpProgressActions.stopProgress(payload));
  }
}

/**
 * Http progress service factory constructor.
 */
export type THttpProgressServiceFactoryConstructor = (
  store: Store,
  overlay: Overlay,
) => HttpProgressService;

/**
 * Http progress service factory.
 */
export const httpProgressServiceFactory: THttpProgressServiceFactoryConstructor = (
  store: Store,
  overlay: Overlay,
) => {
  const progressRef: OverlayRef = overlay.create({
    hasBackdrop: true,
    backdropClass: 'global-spinner-backdrop-dark',
    positionStrategy: overlay.position().global().centerHorizontally().centerVertically(),
  });
  return new HttpProgressService(store, progressRef);
};

/**
 * Http progress service provider.
 */
export const httpProgressServiceProvider: Provider = {
  provide: HttpProgressService,
  useFactory: httpProgressServiceFactory,
  deps: [Store, Overlay],
};
