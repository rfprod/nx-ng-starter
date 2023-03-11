import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppDiagnosticsHomePage } from './diagnostics-home-page.component';

describe('AppDiagnosticsHomePage', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    imports: [MatIconModule, MatListModule],
    declarations: [AppDiagnosticsHomePage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let fixture: ComponentFixture<AppDiagnosticsHomePage>;
  let component: AppDiagnosticsHomePage;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsHomePage);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have expected initial state', () => {
    expect(component.users).toBeNull();
    expect(component.staticData).toBeNull();
    expect(component.dynamicData).toBeNull();
  });
});
