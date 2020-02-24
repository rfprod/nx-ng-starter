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
import { HttpProgressState, httpProgressActions } from './http-progress.store';

@Injectable({
  providedIn: 'root',
})
export class HttpProgressService {
  public readonly output: IHttpProgressObservableOutput = {
    all$: this.store.select(HttpProgressState.AllProgress),
    mainView$: this.store.select(HttpProgressState.MainViewProgress),
  };

  public readonly handlers: IHttpProgressHandlers = {
    mainView: {
      start: () => this.startProgress(this.newHttpProgressState(true)),
      stop: () => this.stopProgress(this.newHttpProgressState(false)),
      tapStopperObservable: <Any>() => {
        return tap<Any>(
          _ => {
            this.handlers.mainView.stop();
          },
          _ => {
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
    return this.store.dispatch(new httpProgressActions.StartProgress(payload));
  }

  private stopProgress(payload: Partial<IHttpProgressStatePayload>) {
    this.detachIndicator();
    return this.store.dispatch(new httpProgressActions.StopProgress(payload));
  }
}

/**
 * Http progress service factory constructor.
 */
export type HttpProgressServiceFactoryConstructor = (
  store: Store,
  overlay: Overlay,
) => HttpProgressService;

/**
 * Http progress service factory.
 */
export const httpProgressServiceFactory: HttpProgressServiceFactoryConstructor = (
  store: Store,
  overlay: Overlay,
) => {
  const progressRef: OverlayRef = overlay.create({
    hasBackdrop: true,
    backdropClass: 'global-spinner-backdrop-dark',
    positionStrategy: overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically(),
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
