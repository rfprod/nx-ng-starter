import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { catchError, lastValueFrom, Observable, of } from 'rxjs';
import { throttleTime, timeout } from 'rxjs/operators';

import { flushHttpRequests } from './http-controller.mock';

describe('flushHttpRequests', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [provideHttpClientTesting(), provideHttpClient()],
  };

  let http: HttpClient;
  let controller: HttpTestingController;
  let verifySpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();

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

  it('should call process actual http requests correctly', async () => {
    await lastValueFrom(http.get('test')).catch(error => {
      expect(error).toBeInstanceOf(HttpErrorResponse);
    });
    flushHttpRequests(controller, true);
    expect(verifySpy).toHaveBeenCalled();
  });

  it('should produce error on demand', async () => {
    await lastValueFrom(http.get('test')).catch(error => {
      expect(error).toBeInstanceOf(HttpErrorResponse);
    });
    flushHttpRequests(controller, true, req => true, {}, true);
    expect(verifySpy).toHaveBeenCalled();
  });

  it('should process calcelled requests correctly', async () => {
    const timeoutValue = 100;
    const throttleValue = 500;

    await lastValueFrom(http.get('test').pipe(timeout(timeoutValue), throttleTime(throttleValue))).catch(error => {
      expect(error).toBeInstanceOf(HttpErrorResponse);
    });
    flushHttpRequests(controller, true, req => true, {});
    expect(verifySpy).toHaveBeenCalled();
  });
});
