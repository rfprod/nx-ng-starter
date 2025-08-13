import type { OverlayRef } from '@angular/cdk/overlay';
import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { catchError, of, throwError } from 'rxjs';

import { AppHttpProgressService } from './http-progress.service';

describe('AppHttpProgressService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    providers: [AppHttpProgressService],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpProgressService;
  let overlayRef: OverlayRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    service = TestBed.inject(AppHttpProgressService);
    overlayRef = service['progressRef'];
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('globalProgressHandler start handler should attach the loading indicator', () => {
    const spy = vi.spyOn(overlayRef, 'attach');
    service.globalProgressHandler.start();
    expect(spy).toHaveBeenCalled();
  });

  it('globalProgressHandler stop handler should detach the loading indicator', () => {
    service.globalProgressHandler.start();
    const spy = vi.spyOn(overlayRef, 'detach');
    service.globalProgressHandler.stop();
    expect(spy).toHaveBeenCalled();
  });

  it('globalProgressHandler.tapStopperObservable should call handers.mainView.stop on success', waitForAsync(() => {
    const spy = vi.spyOn(service.globalProgressHandler, 'stop');
    void of(null).pipe(service.globalProgressHandler.tapStopperObservable()).subscribe();
    expect(spy).toHaveBeenCalled();
  }));

  it('globalProgressHandler.tapStopperObservable should call handers.mainView.stop on error', waitForAsync(() => {
    const spy = vi.spyOn(service.globalProgressHandler, 'stop');
    void throwError(() => new Error(''))
      .pipe(
        service.globalProgressHandler.tapStopperObservable(),
        catchError(() => of(null)),
      )
      .subscribe();
    expect(spy).toHaveBeenCalled();
  }));
});
