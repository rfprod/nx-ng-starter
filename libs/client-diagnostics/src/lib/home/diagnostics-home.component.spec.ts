import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMarkdownService } from '@app/client-services';
import { getTestBedConfig, newTestBedMetadata, setupJestSpiesFor, TClassMemberSpiesObject } from '@app/client-unit-testing';

import { AppDiagnosticsHomeComponent } from './diagnostics-home.component';

describe('AppDiagnosticsHomeComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsHomeComponent],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppDiagnosticsHomeComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppDiagnosticsHomeComponent>;
  let component: AppDiagnosticsHomeComponent;
  let service: AppMarkdownService;
  let spy: {
    service: {
      process: jest.SpyInstance;
    };
    component: TClassMemberSpiesObject<AppDiagnosticsHomeComponent>;
  };

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppDiagnosticsHomeComponent);
          component = fixture.debugElement.componentInstance;
          service = TestBed.inject(AppMarkdownService);
          spy = {
            service: {
              process: jest.spyOn(service, 'process').mockImplementation((input: string) => `marked ${input}`),
            },
            component: setupJestSpiesFor<AppDiagnosticsHomeComponent>(component),
          };
          expect(spy.service.process).toBeDefined();
          expect(spy.component).toBeDefined();
          (component as any).timer$ = null;
          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
