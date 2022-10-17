import { OverlayRef } from '@angular/cdk/overlay';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { AppOverlayRefMock, overlayRefMockProvider } from './overlay-ref.mock';

describe('AppOverlayRefMock', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [overlayRefMockProvider],
  };

  let mock: AppOverlayRefMock;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        mock = TestBed.inject(OverlayRef) as unknown as AppOverlayRefMock;
      });
  }));

  it('should be defined', () => {
    expect(mock).toBeDefined();
  });

  it('should have a hasAttached method that returns true', () => {
    expect(mock.hasAttached()).toBeTruthy();
  });

  it('should have an attach method that returns true', () => {
    expect(mock.attach()).toBeTruthy();
  });

  it('should have a detach method that returns true', () => {
    expect(mock.detach()).toBeTruthy();
  });
});
