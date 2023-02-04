import { DOCUMENT } from '@angular/common';
import { ApplicationRef, NgZone } from '@angular/core';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { of } from 'rxjs';

import { AppServiceWorkerService } from './service-worker.service';

describe('AppServiceWorkerService', () => {
  let service: AppServiceWorkerService;

  const testBedConfig: TestModuleMetadata = {
    providers: [
      {
        provide: ApplicationRef,
        useValue: {
          isStable: of(true),
        },
      },
      {
        provide: SwUpdate,
        useValue: {
          versionUpdates: of(<VersionEvent>{ type: 'NO_NEW_VERSION_DETECTED', version: { hash: 'xx' } }),
          checkForUpdate: () => new Promise<boolean>(resolve => resolve(true)),
        },
      },
      {
        provide: MatSnackBar,
        useValue: {
          open: () => ({
            onAction: () => of(null),
          }),
        },
      },
      {
        provide: NgZone,
        useValue: {
          run: (fn: () => undefined) => fn(),
        },
      },
      {
        provide: DOCUMENT,
        useValue: document,
      },
      AppServiceWorkerService,
    ],
  };

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        service = TestBed.inject(AppServiceWorkerService);
      });
  }));

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test.todo('AppServiceWorkerService');
});
