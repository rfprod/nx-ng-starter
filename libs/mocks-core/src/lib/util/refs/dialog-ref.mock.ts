import { Injectable, Provider } from '@angular/core';
import { Subject } from 'rxjs';

import { MatDialogRef } from '@angular/material';

/**
 * Mocked material dialog.
 */
@Injectable()
export class DialogRefMock {
  private readonly afterClosedSubject: Subject<any> = new Subject();
  public close(event: { action: string; data: any } = { action: 'close', data: {} }): boolean {
    this.afterClosedSubject.next(event);
    this.afterClosedSubject.complete();
    return true;
  }

  public hide(event?: { action: string; data: any }): boolean {
    return true;
  }

  public updateSize(width?: string, height?: string): boolean {
    return true;
  }

  public afterClosed(): Subject<any> {
    return this.afterClosedSubject;
  }
}

export const dialogRefMockProvider: Provider = {
  provide: MatDialogRef,
  useClass: DialogRefMock,
};
