import { DOCUMENT } from '@angular/common';
import { ApplicationRef } from '@angular/core';
import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, type VersionEvent } from '@angular/service-worker';
import { of } from 'rxjs';

import { AppServiceWorkerService } from './service-worker.service';

describe('AppServiceWorkerService', () => {
  // let service: AppServiceWorkerService;

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
          versionUpdates: of({ type: 'NO_NEW_VERSION_DETECTED', version: { hash: 'xx' } } as VersionEvent),
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
        provide: DOCUMENT,
        useValue: document,
      },
      AppServiceWorkerService,
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    // service = TestBed.inject(AppServiceWorkerService);
  });

  /**
   * @todo Fix this unit test.
   */
  // it('should be defined', () => {
  //   expect(service).toBeUndefined();
  // });

  test.todo('AppServiceWorkerService');
});
