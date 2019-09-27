import { Provider } from '@angular/core';

import { OverlayRef } from '@angular/cdk/overlay';

/**
 * Mocked overlay ref.
 */
export class OverlayRefMock {
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
  useClass: OverlayRefMock,
};
