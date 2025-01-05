import { OverlayRef } from '@angular/cdk/overlay';
import type { Provider } from '@angular/core';

export class AppOverlayRefMock {
  public hasAttached(): boolean {
    return true;
  }

  public attach(): boolean {
    return true;
  }

  public detach(): boolean {
    return true;
  }
}

export const overlayRefMockProvider: Provider = {
  provide: OverlayRef,
  useClass: AppOverlayRefMock,
};
