import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TToastType } from '@app/client-util';

import { AppToasterService, toasterServiceProvider } from './toaster.service';

describe('AppToasterService', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [
      {
        provide: MatSnackBar,
        useFactory: () =>
          new Object({
            open: (): MatSnackBarRef<SimpleSnackBar> => new Object({ dismiss: (): void => void 0 }) as MatSnackBarRef<SimpleSnackBar>,
            dismiss: (): void => void 0,
          }) as MatSnackBar,
        deps: [],
      },
      toasterServiceProvider,
    ],
  };

  let service: AppToasterService;
  let snackBar: MatSnackBar;
  let spy: {
    snackBar: {
      open: jest.SpyInstance;
      dismiss: jest.SpyInstance;
    };
  };

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppToasterService);
        snackBar = TestBed.inject(MatSnackBar);
        spy = {
          snackBar: {
            open: jest.spyOn(snackBar, 'open'),
            dismiss: jest.spyOn(snackBar, 'dismiss'),
          },
        };
      });
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(snackBar).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.showToaster).toBeDefined();
    expect(service.hideToaster).toBeDefined();
  });

  it('showToaster should call snackBar.open with the default options if only message is provided as a parameter', () => {
    const defaultDuration = 7000;
    service.showToaster('message');
    const spyCalls = spy.snackBar.open.mock.calls.length - 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: ['primary-bg'],
        verticalPosition: 'bottom',
        duration: defaultDuration,
      },
    ]);
  });

  it('showToaster should call snackBar.open with proper options depending on supplied arguments', () => {
    const defaultDuration = 7000;
    const duration = 2000;
    const toastType: TToastType = 'prmiary' as TToastType;
    service.showToaster('message', toastType, defaultDuration);
    let spyCalls = spy.snackBar.open.mock.calls.length - 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: [],
        verticalPosition: 'bottom',
        duration: defaultDuration,
      },
    ]);

    service.showToaster('message', toastType, duration);
    spyCalls += 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: [],
        verticalPosition: 'bottom',
        duration,
      },
    ]);

    service.showToaster('message', 'error', defaultDuration);
    spyCalls += 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: ['error-bg'],
        verticalPosition: 'bottom',
        duration: defaultDuration,
      },
    ]);

    service.showToaster('message', 'success');
    spyCalls += 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: ['success-bg'],
        verticalPosition: 'bottom',
        duration: defaultDuration,
      },
    ]);

    service.showToaster('message', 'warn');
    spyCalls += 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: ['warn-bg'],
        verticalPosition: 'bottom',
        duration: defaultDuration,
      },
    ]);

    service.showToaster('message', 'accent');
    spyCalls += 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: ['accent-bg'],
        verticalPosition: 'bottom',
        duration: defaultDuration,
      },
    ]);

    service.showToaster('message', 'primary');
    spyCalls += 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      void 0,
      {
        panelClass: ['primary-bg'],
        verticalPosition: 'bottom',
        duration: defaultDuration,
      },
    ]);
  });

  it('should not dismiss snackBar on hideToaster() method call if it was not opened previously', () => {
    service.hideToaster();
    expect(service['snackBarRef']).toBeUndefined();
  });

  it('should dismiss snackBar on hideToaster() method call if it was opened previously', () => {
    service.showToaster('message', 'primary');
    expect(service['snackBarRef']).toBeDefined();
    jest.spyOn((service as unknown as { snackBarRef: MatSnackBarRef<SimpleSnackBar> }).snackBarRef, 'dismiss');
    service.hideToaster();
    expect(service['snackBarRef']?.dismiss).toHaveBeenCalled();
  });
});
