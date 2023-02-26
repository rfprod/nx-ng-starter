import { CUSTOM_ELEMENTS_SCHEMA, SecurityContext } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { DomSanitizer } from '@angular/platform-browser';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppDiagnosticsHomePage } from './diagnostics-home-page.component';

describe('AppDiagnosticsHomePage', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    imports: [MatListModule],
    declarations: [AppDiagnosticsHomePage],
    providers: [
      {
        provide: DomSanitizer,
        useValue: {
          sanitize: (ctx: SecurityContext, input: string) => input,
        },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let fixture: ComponentFixture<AppDiagnosticsHomePage>;
  let component: AppDiagnosticsHomePage;

  let sanitizer: DomSanitizer;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsHomePage);
        component = fixture.debugElement.componentInstance;
        sanitizer = TestBed.inject(DomSanitizer);
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('markedInstructionsChanges should append a sanitiation note', () => {
    const change = 'timer changes 10';
    component.markedInstructionsChanges(change);
    expect(component.markedInstructions).toEqual(
      sanitizer.sanitize(SecurityContext.HTML, `${change}\n\n<small> Sanitized with DOM Sanitizer.</small>`),
    );
  });
});
