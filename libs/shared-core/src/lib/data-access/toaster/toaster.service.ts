import { Injectable, Provider } from '@angular/core';

import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

import { ToastType, ToasterExtraClasses, toasterExtraClasses } from '../interfaces';

/**
 * Toaster service for user feedback.
 * Use to notify user about server responses in human readable format.
 * Usage example:
 * this.toaster.showToaster(error, 'error', 5000);
 */
@Injectable()
export class ToasterService {
  /**
   * Snackbar reference.
   */
  private snackBarRef: MatSnackBarRef<SimpleSnackBar>;

  /**
   * Default toaster duration value.
   */
  private readonly defaultDuration = 7000;

  /**
   * Constructor.
   * @param snackBar material snackbar
   */
  constructor(private readonly snackBar: MatSnackBar) {}

  /**
   * Shows snackbar.
   * @param message text message to be displayed
   * @param type event type, colorizes snackbar
   * @param duration snackbar visibility duration in milliseconds
   */
  public showToaster(
    message: string,
    type: ToastType = 'primary',
    duration: number = this.defaultDuration,
  ): void {
    const ec: ToasterExtraClasses = toasterExtraClasses(type);
    this.snackBarRef = this.snackBar.open(message, null, {
      panelClass: ec,
      verticalPosition: 'bottom',
      duration,
    });
  }

  /**
   * Dismisses snackbar.
   */
  public hideToaster(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }
}

export const toasterServiceProvider: Provider = {
  provide: ToasterService,
  useFactory: (snackBar: MatSnackBar) => new ToasterService(snackBar),
  deps: [MatSnackBar],
};
