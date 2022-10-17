import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, TestModuleMetadata, tick, waitForAsync } from '@angular/core/testing';
import { catchError, Observable, of } from 'rxjs';
import { throttleTime, timeout } from 'rxjs/operators';

import { flushHttpRequests } from './http-controller.mock';

describe('flushHttpRequests', () => {
  const testBedConfig: TestModuleMetadata = {
    imports: [HttpClientTestingModule],
  };

  let http: HttpClient;
  let controller: HttpTestingController;
  let verifySpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        http = TestBed.inject(HttpClient);
        controller = TestBed.inject(HttpTestingController);
        verifySpy = jest.spyOn(controller, 'verify');

        void http
          .get('test-req')
          .pipe(
            catchError((error, caught) => {
              expect(caught).toBeInstanceOf(Observable);
              return of(null);
            }),
          )
          .subscribe();
      });
  }));

  afterEach(() => {
    flushHttpRequests(controller, true);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should not call verify if falled without a respective argument', () => {
    flushHttpRequests(controller);
    expect(verifySpy).not.toHaveBeenCalled();
  });

  it('should call verify if falled with a respective argument', () => {
    flushHttpRequests(controller, true);
    expect(verifySpy).toHaveBeenCalled();
  });

  it('should call process actual http requests correctly', waitForAsync(() => {
    void http
      .get('test')
      .pipe(
        catchError((error, caught) => {
          expect(caught).toBeInstanceOf(Observable);
          return of(null);
        }),
      )
      .subscribe();
    flushHttpRequests(controller, true);
    expect(verifySpy).toHaveBeenCalled();
  }));

  it('should produce error on demand', waitForAsync(() => {
    void http
      .get('test')
      .pipe(
        catchError((error, caught) => {
          expect(caught).toBeInstanceOf(Observable);
          return of(null);
        }),
      )
      .subscribe();
    flushHttpRequests(controller, true, req => true, {}, true);
    expect(verifySpy).toHaveBeenCalled();
  }));

  it('should process calcelled requests correctly', fakeAsync(() => {
    const timeoutValue = 100;
    const throttleValue = 500;
    void http
      .get('test')
      .pipe(
        timeout(timeoutValue),
        throttleTime(throttleValue),
        catchError((error, caught) => {
          expect(caught).toBeInstanceOf(Observable);
          return of(null);
        }),
      )
      .subscribe();
    const tickValue = 500;
    tick(tickValue);
    flushHttpRequests(controller, true, req => true, {});
    expect(verifySpy).toHaveBeenCalled();
    tick(tickValue);
  }));
});
