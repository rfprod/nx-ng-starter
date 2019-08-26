import { TestBed, async } from '@angular/core/testing';

import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
  let service: ToasterService;
  let snackBar: MatSnackBar;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [],
      providers: [
        {
          provide: MatSnackBar,
          useFactory: () =>
            new Object({
              open: (): MatSnackBarRef<SimpleSnackBar> =>
                new Object({ dismiss: (): void => null }) as MatSnackBarRef<
                  SimpleSnackBar
                >,
              dismiss: (): void => null
            }) as MatSnackBar,
          deps: []
        },
        {
          provide: ToasterService,
          useFactory: snackbar => new ToasterService(snackbar),
          deps: [MatSnackBar]
        }
      ]
    })
      .compileComponents()
      .then(() => {
        service = TestBed.get(ToasterService) as ToasterService;
        snackBar = TestBed.get(MatSnackBar) as MatSnackBar;
        jest.spyOn(snackBar, 'open');
        jest.spyOn(snackBar, 'dismiss');
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
    service.showToaster('message', 'notification type' as any);
    expect(snackBar.open).toHaveBeenCalledWith('message', null, {
      panelClass: [],
      verticalPosition: 'bottom',
      duration: 7000
    });

    service.showToaster('message', 'notification type' as any, 2000);
    expect(snackBar.open).toHaveBeenCalledWith('message', null, {
      panelClass: [],
      verticalPosition: 'bottom',
      duration: 2000
    });

    service.showToaster('message', 'error');
    expect(snackBar.open).toHaveBeenCalledWith('message', null, {
      panelClass: ['error-bg'],
      verticalPosition: 'bottom',
      duration: 7000
    });

    service.showToaster('message', 'success');
    expect(snackBar.open).toHaveBeenCalledWith('message', null, {
      panelClass: ['success-bg'],
      verticalPosition: 'bottom',
      duration: 7000
    });

    service.showToaster('message', 'warn');
    expect(snackBar.open).toHaveBeenCalledWith('message', null, {
      panelClass: ['warn-bg'],
      verticalPosition: 'bottom',
      duration: 7000
    });

    service.showToaster('message', 'accent');
    expect(snackBar.open).toHaveBeenCalledWith('message', null, {
      panelClass: ['accent-bg'],
      verticalPosition: 'bottom',
      duration: 7000
    });

    service.showToaster('message', 'primary');
    expect(snackBar.open).toHaveBeenCalledWith('message', null, {
      panelClass: ['primary-bg'],
      verticalPosition: 'bottom',
      duration: 7000
    });
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
