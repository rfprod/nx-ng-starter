import { Injectable } from '@angular/core';

/**
 * Mocked snackbar ref.
 */
@Injectable()
export class MatSnackbarRefMock {
  public open(message: any, action: any, options: any): boolean {
    return true;
  }

  public dismiss(): boolean {
    return true;
  }
}
