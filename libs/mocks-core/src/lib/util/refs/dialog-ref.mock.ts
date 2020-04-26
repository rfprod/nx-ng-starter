import { Injectable, Provider } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

export interface IDialogRefMockCloseEvent {
  action: string;
  data: unknown;
}

/**
 * Mocked material dialog.
 */
@Injectable()
export class DialogRefMock {
  private readonly afterClosedSubject: Subject<IDialogRefMockCloseEvent> = new Subject();
  public close(event: IDialogRefMockCloseEvent = { action: 'close', data: {} }): boolean {
    this.afterClosedSubject.next(event);
    this.afterClosedSubject.complete();
    return true;
  }

  public hide(event?: IDialogRefMockCloseEvent): boolean {
    return true;
  }

  public updateSize(width?: string, height?: string): boolean {
    return true;
  }

  public afterClosed(): Subject<IDialogRefMockCloseEvent> {
    return this.afterClosedSubject;
  }
}

export const dialogRefMockProvider: Provider = {
  provide: MatDialogRef,
  useClass: DialogRefMock,
};
