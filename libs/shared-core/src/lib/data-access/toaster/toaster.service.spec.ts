import { TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { getTestBedConfig, newTestBedMetadata } from '@nx-ng-starter/mocks-core';
import { ToastType } from '../interfaces/toaster/toaster.interface';
import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    providers: [
      {
        provide: MatSnackBar,
        useFactory: () =>
          new Object({
            open: (): MatSnackBarRef<SimpleSnackBar> =>
              new Object({ dismiss: (): void => null }) as MatSnackBarRef<SimpleSnackBar>,
            dismiss: (): void => null,
          }) as MatSnackBar,
        deps: [],
      },
      {
        provide: ToasterService,
        useFactory: snackbar => new ToasterService(snackbar),
        deps: [MatSnackBar],
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: ToasterService;
  let snackBar: MatSnackBar;
  let spy: {
    snackBar: {
      open: jest.SpyInstance;
      dismiss: jest.SpyInstance;
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(ToasterService);
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

  it('showToaster should call snackBar.open with proper options depending on supplied arguments', () => {
    const defaultDuration = 7000;
    const duration = 2000;
    const toastType: ToastType = 'prmiary' as ToastType;
    service.showToaster('message', toastType, defaultDuration);
    let spyCalls = spy.snackBar.open.mock.calls.length - 1;
    expect(spy.snackBar.open.mock.calls[spyCalls]).toEqual([
      'message',
      null,
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
      null,
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
      null,
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
      null,
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
      null,
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
      null,
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
      null,
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
    jest.spyOn(service['snackBarRef'], 'dismiss');
    service.hideToaster();
    expect(service['snackBarRef'].dismiss).toHaveBeenCalled();
  });
});
