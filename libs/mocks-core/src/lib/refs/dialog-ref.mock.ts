import { Injectable, Provider } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

export interface IAppDialogRefMockCloseEvent {
  action: string;
  data: unknown;
}

@Injectable()
export class AppDialogRefMock {
  private readonly afterClosedSubject: Subject<IAppDialogRefMockCloseEvent> = new Subject();

  public close(event: IAppDialogRefMockCloseEvent = { action: 'close', data: {} }): boolean {
    this.afterClosedSubject.next(event);
    this.afterClosedSubject.complete();
    return true;
  }

  public hide(event?: IAppDialogRefMockCloseEvent): boolean {
    return true;
  }

  public updateSize(width?: string, height?: string): boolean {
    return true;
  }

  public afterClosed(): Subject<IAppDialogRefMockCloseEvent> {
    return this.afterClosedSubject;
  }
}

export const dialogRefMockProvider: Provider = {
  provide: MatDialogRef,
  useClass: AppDialogRefMock,
};
