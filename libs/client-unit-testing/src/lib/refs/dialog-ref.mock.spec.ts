import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { AppDialogRefMock, dialogRefMockProvider } from './dialog-ref.mock';

describe('AppDialogRefMock', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [dialogRefMockProvider],
  };

  let mock: AppDialogRefMock;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        mock = TestBed.inject(MatDialogRef) as unknown as AppDialogRefMock;
      });
  }));

  it('should be defined', () => {
    expect(mock).toBeDefined();
  });

  it('should have a close method that returns true', () => {
    expect(mock.close()).toBeTruthy();
  });

  it('should have a hide method that returns true', () => {
    expect(mock.hide()).toBeTruthy();
  });

  it('should have an updateSize method that returns true', () => {
    expect(mock.updateSize()).toBeTruthy();
  });

  it('should have an afterClosed method that returns true', () => {
    expect(mock.afterClosed()).toBeTruthy();
  });
});
