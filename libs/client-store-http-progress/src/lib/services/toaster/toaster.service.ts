import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { toasterExtraClasses, TToasterExtraClasses, TToastType } from '@app/client-util';

/**
 * Toaster service for user feedback.
 * Use to notify user about server responses in human readable format.
 * Usage example:
 * this.toaster.showToaster(error, 'error', 5000);
 */
@Injectable({
  providedIn: 'root',
})
export class AppToasterService {
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Snackbar reference.
   */
  private snackBarRef?: MatSnackBarRef<SimpleSnackBar>;

  /**
   * Default toaster duration value.
   */
  private readonly defaultDuration = 7000;

  /**
   * Shows snackbar.
   * @param message text message to be displayed
   * @param type event type, colorizes snackbar
   * @param duration snackbar visibility duration in milliseconds
   */
  public showToaster(message: string, type: TToastType = 'primary', duration: number = this.defaultDuration): void {
    const ec: TToasterExtraClasses = toasterExtraClasses(type);
    this.snackBarRef = this.snackBar.open(message, void 0, {
      panelClass: ec,
      verticalPosition: 'bottom',
      duration,
    });
  }

  /**
   * Dismisses snackbar.
   */
  public hideToaster(): void {
    if (typeof this.snackBarRef !== 'undefined') {
      this.snackBarRef.dismiss();
    }
  }
}
