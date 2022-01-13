import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMarkdownService } from '@app/client-services';
import { getTestBedConfig, newTestBedMetadata, spyOnFunctions, TClassMemberFunctionSpiesObject } from '@app/client-unit-testing';

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
  let componentSpy: TClassMemberFunctionSpiesObject<AppDiagnosticsHomeComponent>;
  let service: AppMarkdownService;
  let serviceSpy: TClassMemberFunctionSpiesObject<AppMarkdownService>;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppDiagnosticsHomeComponent);
          component = fixture.componentInstance;
          componentSpy = spyOnFunctions<AppDiagnosticsHomeComponent>(component);
          service = TestBed.inject(AppMarkdownService);
          serviceSpy = spyOnFunctions<AppMarkdownService>(service);
          (component as any).timer$ = null;
          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
    expect(componentSpy).toBeDefined();
    expect(serviceSpy).toBeDefined();
  });
});
