import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppDiagnosticsHomeComponent } from './diagnostics-home.component';

describe('AppDiagnosticsHomeComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsHomeComponent],
    providers: [
      {
        provide: Store,
        useValue: {
          select: () =>
            of({
              users: 1,
              staticData: [],
              dynamicData: [],
            }),
        },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let fixture: ComponentFixture<AppDiagnosticsHomeComponent>;
  let component: AppDiagnosticsHomeComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsHomeComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
