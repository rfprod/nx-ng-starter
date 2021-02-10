import { Injectable, Provider } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AppMatSnackbarRefMock {
  public open(message: unknown, action: unknown, options: unknown): boolean {
    return true;
  }

  public dismiss(): boolean {
    return true;
  }
}

export const matSnackbarRefMockProvider: Provider = {
  provide: MatSnackBar,
  useClass: AppMatSnackbarRefMock,
};
