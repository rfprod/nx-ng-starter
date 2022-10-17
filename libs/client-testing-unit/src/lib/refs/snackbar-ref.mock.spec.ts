import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppMatSnackbarRefMock, matSnackbarRefMockProvider } from './snackbar-ref.mock';

describe('AppMatSnackbarRefMock', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [matSnackbarRefMockProvider],
  };

  let mock: AppMatSnackbarRefMock;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        mock = TestBed.inject(MatSnackBar) as unknown as AppMatSnackbarRefMock;
      });
  }));

  it('should be defined', () => {
    expect(mock).toBeDefined();
  });

  it('should have a diamiss method that returns true', () => {
    expect(mock.dismiss()).toBeTruthy();
  });

  it('should have an open method that returns true', () => {
    expect(mock.open('', '', {})).toBeTruthy();
  });
});
