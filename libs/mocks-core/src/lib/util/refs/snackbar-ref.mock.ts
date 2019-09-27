import { Injectable, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material';

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

export const matSnackbarRefMockProvider: Provider = {
  provide: MatSnackBar,
  useClass: MatSnackbarRefMock,
};
