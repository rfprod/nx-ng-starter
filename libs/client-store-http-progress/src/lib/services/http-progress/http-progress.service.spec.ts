import { OverlayRef } from '@angular/cdk/overlay';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { catchError, of, throwError } from 'rxjs';

import { AppHttpProgressService, httpProgressServiceProvider } from './http-progress.service';

describe('AppHttpProgressService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    providers: [httpProgressServiceProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpProgressService;
  let overlayRef: OverlayRef;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppHttpProgressService);
        overlayRef = service['progressRef'];
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('handlers.mainView start handler should attach the loading indicator', () => {
    const spy = jest.spyOn(overlayRef, 'attach');
    service.handlers.mainView.start();
    expect(spy).toHaveBeenCalled();
  });

  it('handlers.mainView stop handler should detach the loading indicator', () => {
    service.handlers.mainView.start();
    const spy = jest.spyOn(overlayRef, 'detach');
    service.handlers.mainView.stop();
    expect(spy).toHaveBeenCalled();
  });

  it('handlers.mainView.tapStopperObservable should call handers.mainView.stop on success', waitForAsync(() => {
    const spy = jest.spyOn(service.handlers.mainView, 'stop');
    void of(null).pipe(service.handlers.mainView.tapStopperObservable()).subscribe();
    expect(spy).toHaveBeenCalled();
  }));

  it('handlers.sidebar.tapStopperObservable should call handers.sidebar.stop on success', waitForAsync(() => {
    const spy = jest.spyOn(service.handlers.sidebar, 'stop');
    void of(null).pipe(service.handlers.sidebar.tapStopperObservable()).subscribe();
    expect(spy).toHaveBeenCalled();
  }));

  it('handlers.mainView.tapStopperObservable should call handers.mainView.stop on error', waitForAsync(() => {
    const spy = jest.spyOn(service.handlers.mainView, 'stop');
    void throwError(() => new Error(''))
      .pipe(
        service.handlers.mainView.tapStopperObservable(),
        catchError(() => of(null)),
      )
      .subscribe();
    expect(spy).toHaveBeenCalled();
  }));

  it('handlers.sidebar.tapStopperObservable should call handers.sidebar.stop on error', waitForAsync(() => {
    const spy = jest.spyOn(service.handlers.sidebar, 'stop');
    void throwError(() => new Error(''))
      .pipe(
        service.handlers.sidebar.tapStopperObservable(),
        catchError(() => of(null)),
      )
      .subscribe();
    expect(spy).toHaveBeenCalled();
  }));
});
